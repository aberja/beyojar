import React, { FC, useCallback, useMemo, useReducer } from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { nanoid } from "nanoid/non-secure";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useTheme } from "styled-components";
import * as Yup from "yup";

import { TagsIcon, TrashIcon } from "@src/assets/icons";
import { Screens } from "@src/common/constants";
import { Label } from "@src/common/interfaces";
import { Spacing } from "@src/common/theme";
import { SafeAreaBox } from "@src/components/atoms";
import { EmptyPlaceholder, FloatingButton, HeaderBar, ListItem } from "@src/components/molecules";
import { ConfirmModal, InputModal } from "@src/components/organism";
import { NavigatorParamList } from "@src/navigation";
import { useNotesStore } from "@src/store";

enum ModalKind {
    /** Display the label name input modal */
    ShowLabelModal,
    /** Display the label delete confirm modal */
    ShowDeleteModal,
    /** Hide any of the displayed modal */
    HideModal,
}

interface ModalChangeAction {
    type: ModalKind;
    payload?: Label;
}

interface ModalState {
    /** The type of modal that is visible */
    visibleModal: ModalKind | null;
    /** Label object will be needed when modifying an existing label */
    label: Label | null;
}

const initialModalState: ModalState = {
    visibleModal: null,
    label: null,
};

const labelManageReducer = (state: ModalState, action: ModalChangeAction) => {
    const { type, payload } = action;
    switch (type) {
        case ModalKind.ShowLabelModal:
            return { visibleModal: type, label: payload || null };
        case ModalKind.ShowDeleteModal:
            return { visibleModal: type, label: payload || null };
        case ModalKind.HideModal:
            return { visibleModal: null, label: null };
        default:
            return state;
    }
};

/** Screen to allow users to manage their labels (Create new labels or edit/delete existing labels) */
export const LabelManageScreen: FC<NativeStackScreenProps<NavigatorParamList, Screens.labelManage>> = () => {
    const { pallette } = useTheme();
    const { t } = useTranslation();
    const { labels, addLabel, deleteLabel, updateLabel } = useNotesStore();

    const [modalState, stateDispatch] = useReducer(labelManageReducer, initialModalState);

    /** Update a label if it exists, or create a new label */
    const onSaveLabel = useCallback(
        (label: string) => {
            if (modalState?.label?.id) {
                // Update the label, if label ID already exists
                updateLabel({ id: modalState?.label?.id, name: label });
            } else {
                // Create new label if label ID doesn't exist
                addLabel({ id: nanoid(), name: label });
            }
        },
        [modalState?.label?.id]
    );

    /**
     * Yup schema to validate the label name input.
     * Also validates if duplicate label name is being entered
     */
    const labelNameSchema = useMemo(() => {
        const existingLabels = modalState?.label?.name
            ? labels.filter((item) => item.name !== modalState?.label?.name).map((item) => item.name.toLowerCase())
            : labels.map((item) => item.name.toLowerCase());
        return Yup.object().shape({
            field: Yup.string()
                .transform((val) => val?.trim())
                .min(2, t("screens.labelManage.inputModal.validation.tooShort"))
                .max(25, t("screens.labelManage.inputModal.validation.tooLong"))
                .required(t("screens.labelManage.inputModal.validation.required"))
                .test("duplicate-check", t("screens.labelManage.inputModal.validation.duplicateExist"), (value) => {
                    // Show a validation error if label name already exists
                    return !!value && !existingLabels.includes(value.toLowerCase());
                }),
        });
    }, [modalState?.label?.name]);

    /** Remove the label from the persisted store and show a toast message */
    const onDeleteConfirm = useCallback(() => {
        deleteLabel(modalState?.label?.id as string);
        stateDispatch({ type: ModalKind.HideModal });
        showMessage({
            message: t("screens.labelManage.labelDeleted"),
            icon: <TrashIcon />,
            backgroundColor: pallette.error.light,
        });
    }, [modalState?.label?.id, pallette.error.light]);

    /** Show create new label modal */
    const onShowCreateLabelModal = useCallback(() => stateDispatch({ type: ModalKind.ShowLabelModal }), []);

    /** Hide any of the displayed modals */
    const onModalHide = useCallback(() => stateDispatch({ type: ModalKind.HideModal }), []);

    return (
        <SafeAreaBox bg={pallette.background}>
            <HeaderBar title={t("components.drawer.manageLabels")} />
            <FlatList
                data={labels}
                renderItem={({ item }) => (
                    <ListItem
                        key={item.id}
                        onPress={() => stateDispatch({ type: ModalKind.ShowLabelModal, payload: item })}
                        text={item.name}
                        Prefix={<TagsIcon color={pallette.grey} />}
                        mx={Spacing.medium}
                        Suffix={
                            <TrashIcon
                                color={pallette.error.dark}
                                touchable={{
                                    onPress: () => stateDispatch({ type: ModalKind.ShowDeleteModal, payload: item }),
                                }}
                            />
                        }
                    />
                )}
                keyExtractor={(item, index) => item.id || `${index}`}
                ListEmptyComponent={<EmptyPlaceholder text={t("screens.labelManage.noLabelsFound")} Icon={TagsIcon} />}
            />
            <FloatingButton
                onPress={onShowCreateLabelModal}
                visible={modalState.visibleModal === null}
                accessibilityLabel={t("screens.labelManage.addButtonA11yLabel")}
                accessibilityHint={t("screens.labelManage.addButtonA11yHint")}
            />
            <InputModal
                initialValue={modalState?.label?.name || ""}
                onSave={onSaveLabel}
                isVisible={modalState.visibleModal === ModalKind.ShowLabelModal}
                onClose={onModalHide}
                title={t(`screens.labelManage.inputModal.title.${modalState?.label?.id ? "edit" : "create"}`)}
                inputPlaceholder={t("screens.labelManage.inputModal.inputPlaceholder")}
                schema={labelNameSchema}
            />
            <ConfirmModal
                title={t("common.confirm")}
                message={t("screens.labelManage.deleteLabelMessage")}
                primaryBtnText={t("common.delete")}
                isVisible={modalState.visibleModal === ModalKind.ShowDeleteModal}
                onClose={onModalHide}
                color={pallette.error.dark}
                Icon={TrashIcon}
                onConfirmPress={onDeleteConfirm}
            />
        </SafeAreaBox>
    );
};