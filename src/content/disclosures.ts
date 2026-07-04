export type DisclosureCalloutTitle =
  | "Registration Information"
  | "Risk Reminder"
  | "Past Performance"
  | "No Legal or Tax Advice";

export type DisclosureBlock =
  | { type: "paragraph"; text: string }
  | { type: "callout"; title: DisclosureCalloutTitle; text: string };

export interface DisclosureSection {
  id: string;
  title: string;
  blocks: DisclosureBlock[];
}

export const disclosureSections: DisclosureSection[] = [
  {
    id: "website-disclosure",
    title: "Website Disclosure",
    blocks: [
      {
        type: "callout",
        title: "Registration Information",
        text: "Market Street Wealth Management Advisors, LLC (\u201CMSWMA\u201D) is an SEC registered investment adviser located in Indianapolis, Indiana.  A copy of MSWMA current written disclosure Brochure discussing our advisory services and fees continues to remain available upon request.",
      },
      {
        type: "paragraph",
        text: "MSWMA may only transact business in those states in which it is registered, or qualifies for an exemption or exclusion from registration requirements. MSWMA\u2019s web site is limited to the dissemination of general information pertaining to its advisory services, together with access to additional investment-related information, publications, and links. Accordingly, the publication of MSWMA\u2019s web site on the Internet should not be construed by any consumer and/or prospective client as MSWMA\u2019s solicitation to effect, or attempt to effect transactions in securities, or the rendering of personalized investment advice for compensation, over the Internet. Any subsequent, direct communication by MSWMA with a prospective client shall be conducted by a representative that is either registered or qualifies for an exemption or exclusion from registration in the state where the prospective client resides. A copy of MSWMA\u2019s current written disclosure Brochure and Form CRS discussing MSWMA\u2019s business operations, services, and fees is available on this web site and/or from MSWMA upon written request. MSWMA does not make any representations or warranties as to the accuracy, timeliness, suitability, completeness, or relevance of any information prepared by any unaffiliated third party, whether linked to MSWMA\u2019s web site or incorporated herein, and takes no responsibility therefor. All such information is provided solely for convenience purposes only and all users thereof should be guided accordingly.",
      },
      {
        type: "callout",
        title: "Risk Reminder",
        text: "Please remember that different types of investments involve varying degrees of risk, and there can be no assurance that the future performance of any specific investment or investment strategy (including those undertaken or recommended by MSWMA), will be profitable or equal any historical performance level(s).",
      },
      {
        type: "paragraph",
        text: "Certain portions of MSWMA\u2019s web site (i.e. newsletters, articles, commentaries, etc.) may contain a discussion of, and/or provide access to, MSWMA (and those of other investment and non-investment professionals) positions and/or recommendations as of a specific prior date. Due to various factors, including changing market conditions, such discussion may no longer be reflective of current position(s) and/or recommendation(s). Moreover, no client or prospective client should assume that any such discussion serves as the receipt of, or a substitute for, personalized advice from MSWMA, or from any other investment professional.",
      },
      {
        type: "callout",
        title: "No Legal or Tax Advice",
        text: "MSWMA is neither an attorney nor an accountant, and no portion of the web site content should be interpreted as legal, accounting or tax advice.",
      },
      {
        type: "paragraph",
        text: "Please Note: Limitations. Neither rankings nor recognitions by unaffiliated rating services, publications, media, or other organizations, nor the achievement of any professional designation, certification, degree, or license, membership in any professional organization, or any amount of prior experience or success, should be construed by a client or prospective client as a guarantee that the client will experience a certain level of results if the investment professional or the investment professional\u2019s firm is engaged, or continues to be engaged, to provide investment advisory services. A fee was not paid by either the investment professional or the investment professional\u2019s firm to receive the ranking. The ranking is based upon specific criteria and methodology (see ranking criteria/methodology). No ranking or recognition should be construed as an endorsement by any past or current client of the investment professional or the investment professional\u2019s firm.",
      },
      {
        type: "paragraph",
        text: "To the extent that any client or prospective client utilizes any economic calculator or similar interactive device contained within or linked to MSWMA\u2019s web site, the client and/or prospective client acknowledges and understands that the information resulting from the use of any such calculator/device, is not, and should not be construed, in any manner whatsoever, as the receipt of, or a substitute for, personalized individual advice from MSWMA, or from any other investment professional.",
      },
      {
        type: "paragraph",
        text: "Each client and prospective client agrees, as a condition precedent to his/her/its access to MSWMA\u2019s web site, to release and hold harmless MSWMA, its officers, directors, owners, employees and agents from any and all adverse consequences resulting from any of his/her/its actions and/or omissions which are independent of his/her/its receipt of personalized individual advice from MSWMA.",
      },
    ],
  },
  {
    id: "blog-disclosure",
    title: "Blog Disclosure",
    blocks: [
      {
        type: "callout",
        title: "Past Performance",
        text: "Please remember that past performance may not be indicative of future results.",
      },
      {
        type: "paragraph",
        text: "Different types of investments involve varying degrees of risk, and there can be no assurance that the future performance of any specific investment, investment strategy, or product (including the investments and/or investment strategies recommended or undertaken by Market Street Wealth Management Advisors, LLC [\u201CMSWMA\u201D]), or any non-investment related content, made reference to directly or indirectly in this blog will be profitable, equal any corresponding indicated historical performance level(s), be suitable for your portfolio or individual situation, or prove successful. Due to various factors, including changing market conditions and/or applicable laws, the content may no longer be reflective of current opinions or positions. Moreover, you should not assume that any discussion or information contained in this blog serves as the receipt of, or as a substitute for, personalized investment advice from MSWMA. To the extent that a reader has any questions regarding the applicability of any specific issue discussed above to his/her individual situation, he/she is encouraged to consult with the professional advisor of his/her choosing.",
      },
      {
        type: "callout",
        title: "No Legal or Tax Advice",
        text: "MSWMA is neither a law firm nor a certified public accounting firm and no portion of the blog content should be construed as legal or accounting advice.",
      },
      {
        type: "paragraph",
        text: "A copy of the MSWMA\u2019s current written disclosure Brochure discussing our advisory services and fees is available for review upon request or at www.MSWMA.com. Please Note: MSWMA does not make any representations or warranties as to the accuracy, timeliness, suitability, completeness, or relevance of any information prepared by any unaffiliated third party, whether linked to MSWMA\u2019s web site or blog or incorporated herein, and takes no responsibility for any such content. All such information is provided solely for convenience purposes only and all users thereof should be guided accordingly. Please Remember: If you are a MSWMA client, please contact MSWMA, in writing, if there are any changes in your personal/financial situation or investment objectives for the purpose of reviewing/evaluating/revising our previous recommendations and/or services, or if you would like to impose, add, or to modify any reasonable restrictions to our investment advisory services. Unless, and until, you notify us, in writing, to the contrary, we shall continue to provide services as we do currently. Please Also Remember to advise us if you have not been receiving account statements (at least quarterly) from the account custodian.",
      },
    ],
  },
];
