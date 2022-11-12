import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Footer } from "@src/components/Footer";
import { $translate as t } from "qwik-speak";
import { Header, SubHeader, Paragraph } from "@src/components/Document/Document";

/**
 * Terms and condition page required for legal purposes.
 * Generated using freeprivacypolicy.com.
 * @link https://app.freeprivacypolicy.com/download/149cb4e3-2e6b-4d5e-98f6-cabc8b4d3dfe
 */
export default component$(() => {
    return (
        <>
            <div className="flex flex-col items-center justify-center text-justify">
                <div className="container bg-gray-100 p-7 my-8 rounded-lg">
                    <h1 className="my-4 text-3xl text-left lg:text-4xl font-bold">{t("common.termsAndConditions")}</h1>
                    <p className="font-thin">{t("termsAndConditions.lastUpdated")}</p>
                    <Paragraph text={t("termsAndConditions.pleaseReadText")} />
                    <Header text={t("termsAndConditions.section1.title")} />
                    <SubHeader text={t("termsAndConditions.section1.subSection1.title")} />
                    <Paragraph text={t("termsAndConditions.section1.subSection1.content")} />
                    <SubHeader text={t("termsAndConditions.section1.subSection2.title")} />
                    <Paragraph text={t("termsAndConditions.section1.subSection2.description")} />
                    <ul className="list-disc pl-3">
                        {Array.from(Array(Number(t("termsAndConditions.section1.subSection2.itemsLength")))).map(
                            (_, i) => (
                                <li>
                                    <p>
                                        <strong>{t(`termsAndConditions.section1.subSection2.items.${i}.key`)}</strong>
                                        {` ${t(`termsAndConditions.section1.subSection2.items.${i}.value`)}`}
                                    </p>
                                </li>
                            )
                        )}
                    </ul>
                    <Header text={t("termsAndConditions.section2.title")} />
                    <Paragraph text={t("termsAndConditions.section2.content")} />
                    <Header text={t("termsAndConditions.section3.title")} />
                    <Paragraph text={t("termsAndConditions.section3.content")} />
                    <Header text={t("termsAndConditions.section4.title")} />
                    <Paragraph text={t("termsAndConditions.section4.content")} />
                    <Header text={t("termsAndConditions.section5.title")} />
                    <Paragraph text={t("termsAndConditions.section5.content")} />
                    <Header text={t("termsAndConditions.section6.title")} />
                    <Paragraph text={t("termsAndConditions.section6.content")} />
                    <Header text={t("termsAndConditions.section7.title")} />
                    <Paragraph text={t("termsAndConditions.section7.content")} />
                    <Header text={t("termsAndConditions.section8.title")} />
                    <Paragraph text={t("termsAndConditions.section8.content")} />
                    <Header text={t("termsAndConditions.section9.title")} />
                    <Paragraph text={t("termsAndConditions.section9.content")} />
                    <Header text={t("termsAndConditions.section10.title")} />
                    <Paragraph text={t("termsAndConditions.section10.content")} />
                    <Header text={t("termsAndConditions.section11.title")} />
                    <SubHeader text={t("termsAndConditions.section11.subSection1.title")} />
                    <Paragraph text={t("termsAndConditions.section11.subSection1.content")} />
                    <SubHeader text={t("termsAndConditions.section11.subSection2.title")} />
                    <Paragraph text={t("termsAndConditions.section11.subSection2.content")} />
                    <Header text={t("termsAndConditions.section12.title")} />
                    <Paragraph text={t("termsAndConditions.section12.content")} />
                    <Header text={t("termsAndConditions.section13.title")} />
                    <Paragraph text={t("termsAndConditions.section13.content")} />
                    <Header text={t("termsAndConditions.section14.title")} />
                    <Paragraph text={t("termsAndConditions.section14.content")} />
                    <ul className="list-disc pl-3">
                        <li>
                            <p>{t("termsAndConditions.section14.contactEmail", { email: "a.kajendran@gmail.com" })}</p>
                        </li>
                        <li>
                            <p>
                                {t("termsAndConditions.section14.byVisiting")}
                                <a href="https://www.beyojar.com" rel="external nofollow noopener" target="_blank">
                                    https://www.beyojar.com
                                </a>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    );
});

export const head: DocumentHead = { title: "Beyojar: Terms & Conditions" };
