import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { InfoIcon } from "@src/assets/icons";

import { ToastComponent } from "./ToastComponent";

export default {
    title: "molecules/ToastComponent",
    component: ToastComponent,
    parameters: { layout: "fullscreen" },
} as ComponentMeta<typeof ToastComponent>;

const Template: ComponentStory<typeof ToastComponent> = (args) => <ToastComponent {...args} />;

export const Default = Template.bind({});
Default.args = { message: { message: "Toast message" } };

export const WithIcon = Template.bind({});
WithIcon.args = { message: { message: "Toast message with Icon" }, icon: <InfoIcon /> };

export const WithCustomBackground = Template.bind({});
WithCustomBackground.args = { message: { message: "Toast with custom background", backgroundColor: "#e53935" } };