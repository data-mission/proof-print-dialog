window.SAMPLE_DOC = {
  title: "Northgate Holdings — Q3 Operating Review",
  filename: "Q3_Operating_Review_FINAL_v4.docx",

  css: `
.doc {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 11pt;
  line-height: 1.55;
  color: #1a1a1a;
  max-width: 6.5in;
  margin: 0 auto;
}
.doc * { box-sizing: border-box; }

.doc h1, .doc h2, .doc h3 {
  font-family: Georgia, 'Times New Roman', Times, serif;
  color: #111111;
  font-weight: 700;
  line-height: 1.25;
}
.doc h2 {
  font-size: 18pt;
  margin: 0 0 0.6em 0;
  padding-bottom: 0.2em;
  border-bottom: 2px solid #2f5d8a;
}
.doc h3 {
  font-size: 13pt;
  margin: 1.4em 0 0.5em 0;
  color: #2f5d8a;
}
.doc p {
  margin: 0 0 0.9em 0;
  text-align: justify;
  hyphens: auto;
}
.doc strong { color: #111111; }
.doc .section-kicker {
  font-size: 8.5pt;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #777777;
  margin: 0 0 0.3em 0;
}

.doc .pagebreak {
  display: block;
  height: 0;
  margin: 0;
  padding: 0;
  border: 0;
  page-break-after: always;
  break-after: page;
}

/* Title page */
.doc .title-page {
  text-align: center;
  padding-top: 2.2in;
}
.doc .doc-eyebrow {
  font-size: 9pt;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #666666;
  margin-bottom: 1.4in;
}
.doc .doc-title {
  font-size: 33pt;
  margin: 0 0 0.15em 0;
  letter-spacing: 0.01em;
}
.doc .doc-subtitle {
  font-size: 16pt;
  font-weight: normal;
  margin: 0.1em 0;
  color: #222222;
}
.doc .doc-subtitle-minor {
  font-size: 11pt;
  color: #555555;
  margin: 0.15em 0 1.7in 0;
}
.doc .title-meta p {
  margin: 0.18em 0;
  font-size: 10.5pt;
  color: #444444;
}

/* Table of contents */
.doc .toc {
  list-style: none;
  padding: 0;
  margin: 1.2em 0 0 0;
}
.doc .toc li {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dotted #bbbbbb;
  padding: 0.4em 0;
  font-size: 11.5pt;
}
.doc .toc li span:last-child {
  color: #555555;
}

/* Tables */
.doc table {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0 1.2em 0;
  font-size: 10.5pt;
}
.doc caption {
  text-align: left;
  font-size: 9.5pt;
  color: #666666;
  margin-bottom: 0.4em;
  font-style: italic;
}
.doc th, .doc td {
  border: 1px solid #999999;
  padding: 6px 10px;
  text-align: right;
}
.doc th:first-child, .doc td:first-child {
  text-align: left;
}
.doc thead th {
  background: #eef2f6;
  font-weight: 700;
}
.doc tr.total-row td {
  font-weight: 700;
  border-top: 2px solid #333333;
}

/* Blockquote / pull quote */
.doc blockquote {
  border-left: 4px solid #2f5d8a;
  margin: 1.3em 0;
  padding: 0.3em 1.3em;
  font-style: italic;
  color: #333333;
}
.doc blockquote.pull-quote {
  font-size: 15pt;
  line-height: 1.4;
  text-align: left;
}
.doc blockquote footer {
  margin-top: 0.5em;
  font-size: 10pt;
  font-style: normal;
  color: #666666;
}

/* Lists */
.doc ul, .doc ol {
  margin: 0.7em 0 1em 1.4em;
  padding: 0;
}
.doc li { margin-bottom: 0.4em; }

/* Chart */
.doc .chart-wrap { margin: 1.3em 0 1.6em 0; }
.doc .chart-title {
  font-weight: 700;
  font-size: 10.5pt;
  margin-bottom: 0.5em;
  color: #222222;
}
.doc .chart-legend {
  font-size: 9pt;
  color: #444444;
  margin-top: 0.5em;
}
.doc .chart-legend .swatch {
  display: inline-block;
  width: 9px;
  height: 9px;
  margin-right: 4px;
  vertical-align: middle;
}

/* Signature block */
.doc .signature-block { margin-top: 1.6in; }
.doc .sig-row {
  display: flex;
  gap: 0.6in;
  margin-bottom: 0.9in;
}
.doc .sig-cell { flex: 1; }
.doc .sig-line {
  border-top: 1px solid #333333;
  padding-top: 0.35em;
  margin-top: 0.55in;
  font-size: 10pt;
}
.doc .sig-name { font-weight: 700; }
.doc .sig-title { color: #555555; font-size: 9.5pt; }

/* Waste / low-content pages */
.doc .copyright-page {
  margin-top: 4.2in;
  text-align: center;
  color: #999999;
  font-size: 9pt;
}
.doc .continued-page {
  margin-top: 4.2in;
  text-align: center;
  color: #888888;
  font-size: 11pt;
  letter-spacing: 0.06em;
}
.doc .blank-page {
  margin-top: 4in;
  text-align: center;
  color: #888888;
  font-size: 11pt;
  font-style: italic;
}
.doc .folio-page {
  margin-top: 4.4in;
  text-align: center;
  color: #999999;
  font-size: 11pt;
}
.doc .orphan-footer {
  margin-top: 7.1in;
  text-align: center;
  color: #777777;
  font-size: 9pt;
}

/* Appendix */
.doc .appendix-tag {
  display: inline-block;
  background: #eef2f6;
  color: #2f5d8a;
  font-size: 9pt;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.2em 0.6em;
  margin-bottom: 0.6em;
}
`,

  html: `
<div class="title-page">
  <div class="doc-eyebrow">Confidential &mdash; Prepared for the Board of Directors</div>
  <h1 class="doc-title">Northgate Holdings</h1>
  <p class="doc-subtitle">Q3 Operating Review</p>
  <p class="doc-subtitle-minor">Fiscal Third Quarter Ended September 30, 2026</p>
  <div class="title-meta">
    <p>Prepared for the Board of Directors</p>
    <p>Northgate Holdings, Inc.</p>
    <p>Denver, Colorado</p>
    <p>October 14, 2026</p>
  </div>
</div>
<div class="pagebreak"></div>

<h2>Table of Contents</h2>
<ul class="toc">
  <li><span>1.&nbsp;&nbsp;Executive Summary</span><span>3</span></li>
  <li><span>2.&nbsp;&nbsp;Financial Performance</span><span>5</span></li>
  <li><span>3.&nbsp;&nbsp;Operations &amp; Supply Chain</span><span>8</span></li>
  <li><span>4.&nbsp;&nbsp;Headcount &amp; Talent</span><span>10</span></li>
  <li><span>5.&nbsp;&nbsp;Outlook &amp; Risk Factors</span><span>13</span></li>
  <li><span>6.&nbsp;&nbsp;Signature &amp; Approvals</span><span>14</span></li>
  <li><span>Appendix A: Headcount by Location</span><span>15</span></li>
</ul>
<div class="pagebreak"></div>

<div class="section-kicker">Section One</div>
<h2>Executive Summary</h2>
<p>Northgate Holdings delivered consolidated revenue of $184.6 million in the third quarter of fiscal 2026, an increase of 12.0% over the $164.8 million reported in the prior-year quarter. Growth was broad-based across all three operating segments, with Distribution Services once again the fastest-growing line of business. Adjusted EBITDA reached $34.9 million, representing a margin of 18.9%, up from $28.9 million and 17.5% in the prior-year period. Net income was $19.2 million, or $0.61 per diluted share, compared with $15.4 million, or $0.48 per diluted share, a year earlier. The improvement in per-share results reflects both the increase in net income and a modest reduction in diluted shares outstanding, from 31.8 million to 31.5 million, following the continued execution of the Company's share repurchase program.</p>
<p>The quarter's most significant operational milestone was the opening of our new distribution center in Calgary, Alberta, on August 3. The 140,000-square-foot facility gives Northgate its first dedicated logistics footprint in Western Canada and is central to our strategy of shortening delivery windows for Industrial Systems customers in the region. The facility began operations with 85 employees and is on track to reach a target complement of 160 by the end of the first quarter of fiscal 2027. Early throughput has tracked ahead of the ramp plan we presented to the Board in June.</p>
<p>Results were achieved against a backdrop of continued cost pressure in freight and select raw material categories, along with a labor market in our Reno and Memphis hubs that remains tighter than historical norms. Management responded by accelerating supplier diversification efforts begun in the first quarter and by expanding the retention initiatives described in Section 4. Taken together, we believe the quarter demonstrates that the operating model can absorb these pressures while still expanding margin, and the Company is reaffirming full-year guidance issued on the second-quarter call, with an updated fourth-quarter revenue range provided in Section 5.</p>
<div class="pagebreak"></div>

<div class="pagebreak"></div>
<div class="copyright-page">
  <p>&copy; 2026 Northgate Holdings, Inc. All rights reserved.</p>
</div>
<div class="pagebreak"></div>

<div class="section-kicker">Section Two</div>
<h2>Financial Performance</h2>
<p>Consolidated revenue for the third quarter was $184.6 million, up 12.0% from $164.8 million in the prior-year quarter. Gross margin expanded to 41.3%, from 40.1%, driven primarily by pricing actions taken in the second quarter and by a more favorable segment mix as Distribution Services, which carries a higher gross margin than Industrial Systems, grew to a larger share of total revenue. Selling, general and administrative expense was 16.8% of revenue, down from 17.5%, reflecting continued discipline on discretionary spending and the operating leverage generated by revenue growth outpacing headcount growth in corporate functions.</p>
<table>
  <caption>Table 1. Revenue by reportable segment, three months ended September 30 ($ in millions)</caption>
  <thead>
    <tr>
      <th>Segment</th>
      <th>Q3 2026</th>
      <th>Q3 2025</th>
      <th>YoY Change</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Industrial Systems</td>
      <td>$98.2</td>
      <td>$89.7</td>
      <td>+9.5%</td>
    </tr>
    <tr>
      <td>Distribution Services</td>
      <td>$61.4</td>
      <td>$52.1</td>
      <td>+17.9%</td>
    </tr>
    <tr>
      <td>Specialty Materials</td>
      <td>$25.0</td>
      <td>$23.0</td>
      <td>+8.7%</td>
    </tr>
    <tr class="total-row">
      <td>Total revenue</td>
      <td>$184.6</td>
      <td>$164.8</td>
      <td>+12.0%</td>
    </tr>
  </tbody>
</table>
<p>Adjusted EBITDA of $34.9 million compares with $28.9 million in the prior-year quarter, and the resulting margin of 18.9% compares with 17.5%. Net income was $19.2 million, or a net margin of 10.4%, up from $15.4 million and 9.3% a year earlier. Free cash flow for the quarter was $21.7 million, and the Company ended the period with $58.3 million of cash and equivalents and $142.0 million of total debt, for net leverage of 0.6x trailing twelve-month Adjusted EBITDA.</p>
<div class="pagebreak"></div>

<div class="pagebreak"></div>
<div class="continued-page">
  <p>&mdash; continued &mdash;</p>
</div>
<div class="pagebreak"></div>

<h3>Segment revenue trend</h3>
<p>The chart below sets out quarterly segment revenue against the prior-year comparable period. Distribution Services posted the strongest growth rate in the portfolio for the fourth consecutive quarter, a trend management attributes to the build-out of the third-party logistics offering launched in late fiscal 2025 and now to the Calgary facility described in Section 3.</p>
<div class="chart-wrap">
  <div class="chart-title">Figure 1. Revenue by segment &mdash; Q3 2026 vs. Q3 2025 ($ in millions)</div>
  <svg viewBox="0 0 520 250" width="100%" height="250" role="img" aria-label="Bar chart comparing Q3 2026 and Q3 2025 revenue across the three reportable segments">
    <line x1="60" y1="20" x2="60" y2="220" stroke="#333333" stroke-width="1"></line>
    <line x1="60" y1="220" x2="500" y2="220" stroke="#333333" stroke-width="1"></line>
    <line x1="60" y1="180" x2="500" y2="180" stroke="#dddddd" stroke-width="1"></line>
    <line x1="60" y1="140" x2="500" y2="140" stroke="#dddddd" stroke-width="1"></line>
    <line x1="60" y1="100" x2="500" y2="100" stroke="#dddddd" stroke-width="1"></line>
    <line x1="60" y1="60" x2="500" y2="60" stroke="#dddddd" stroke-width="1"></line>
    <line x1="60" y1="20" x2="500" y2="20" stroke="#dddddd" stroke-width="1"></line>
    <text x="52" y="224" font-size="9" text-anchor="end" fill="#555555">0</text>
    <text x="52" y="184" font-size="9" text-anchor="end" fill="#555555">20</text>
    <text x="52" y="144" font-size="9" text-anchor="end" fill="#555555">40</text>
    <text x="52" y="104" font-size="9" text-anchor="end" fill="#555555">60</text>
    <text x="52" y="64" font-size="9" text-anchor="end" fill="#555555">80</text>
    <text x="52" y="24" font-size="9" text-anchor="end" fill="#555555">100</text>
    <rect x="100" y="23.6" width="30" height="196.4" fill="#2f5d8a"></rect>
    <rect x="135" y="40.6" width="30" height="179.4" fill="#aab4bd"></rect>
    <rect x="220" y="97.2" width="30" height="122.8" fill="#2f5d8a"></rect>
    <rect x="255" y="115.8" width="30" height="104.2" fill="#aab4bd"></rect>
    <rect x="340" y="170" width="30" height="50" fill="#2f5d8a"></rect>
    <rect x="375" y="174" width="30" height="46" fill="#aab4bd"></rect>
    <text x="132" y="235" font-size="9" text-anchor="middle" fill="#333333">Industrial Systems</text>
    <text x="252" y="235" font-size="9" text-anchor="middle" fill="#333333">Distribution Svcs.</text>
    <text x="372" y="235" font-size="9" text-anchor="middle" fill="#333333">Specialty Materials</text>
  </svg>
  <div class="chart-legend"><span class="swatch" style="background:#2f5d8a;"></span>Q3 2026&nbsp;&nbsp;&nbsp;<span class="swatch" style="background:#aab4bd;"></span>Q3 2025</div>
</div>
<div class="pagebreak"></div>

<div class="section-kicker">Section Three</div>
<h2>Operations &amp; Supply Chain</h2>
<p>The Calgary distribution center is the largest single facility investment Northgate has made since the Memphis expansion in fiscal 2022. Situated in the Foothills Industrial Park, the 140,000-square-foot site consolidates inventory previously served out of third-party warehouses in Edmonton and Regina, and is expected to reduce average delivery times to Western Canadian Industrial Systems customers from 6.2 days to 2.8 days once fully ramped. The facility opened with 85 employees across warehousing, transportation planning, and site administration, and the site leadership team expects to reach a target complement of 160 by the end of the first quarter of fiscal 2027, in line with the hiring plan set out in Section 4.</p>
<p>Supply chain diversification, a priority the Board asked management to address following the component shortages of fiscal 2024, continued to show measurable progress. Single-source components as a share of cost of goods sold declined to 22% in the quarter, down from 34% a year ago and from 27% last quarter, as qualification of a second supplier for precision-machined housings in our Industrial Systems line was completed in July. Management expects this figure to stabilize in the high teens by the end of fiscal 2027 as the remaining qualification work on electronic control modules concludes.</p>
<p>Northgate's logistics network now comprises five primary hubs: Columbus, Ohio; Memphis, Tennessee; Reno, Nevada; the newly opened Calgary, Alberta facility; and a smaller cross-dock operation in Charlotte, North Carolina that primarily serves Specialty Materials customers in the Southeast. Inbound freight costs per unit declined 3.1% sequentially as fuel surcharges eased from their second-quarter peak, though management continues to model elevated freight costs into the fourth quarter given seasonal demand patterns in the Industrial Systems channel.</p>
<div class="pagebreak"></div>

<div class="pagebreak"></div>
<div class="blank-page">
  <p>This page intentionally left blank.</p>
</div>
<div class="pagebreak"></div>

<div class="section-kicker">Section Four</div>
<h2>Headcount &amp; Talent</h2>
<p>Total headcount at quarter end was 3,412, an increase of 222 from 3,190 in the prior-year quarter. The net addition was concentrated in the Calgary ramp and in customer-facing roles within Distribution Services, partially offset by planned attrition in corporate shared services following the finance-system consolidation completed in the second quarter. Voluntary attrition for the quarter was 11.2%, an improvement from 13.8% a year ago, which management attributes to the retention initiatives below and to a broader cooling in regional labor markets outside of Calgary.</p>
<p>Talent initiatives introduced or expanded during the quarter included the following:</p>
<ul>
  <li>A referral bonus increase for warehousing and logistics roles at the Columbus and Memphis hubs, raising the standard referral bonus from $500 to $1,000.</li>
  <li>Launch of a tuition assistance program for hourly employees pursuing logistics or supply chain certifications, capped at $2,500 per employee per year.</li>
  <li>Expansion of the manager training curriculum to all site leads at the Reno facility, following a pilot that reduced first-year supervisor turnover by roughly a third.</li>
  <li>A cost-of-living adjustment for Calgary-based roles, benchmarked against three comparable logistics employers in the Calgary metro area.</li>
  <li>Continued rollout of the flexible-shift scheduling system first piloted in Memphis, now covering four of five distribution hubs.</li>
</ul>
<p>The Calgary hiring plan proceeds in five stages, tracked jointly by site leadership and corporate talent acquisition:</p>
<ol>
  <li>Core leadership and site administration hires, completed prior to the August 3 opening.</li>
  <li>Initial warehousing and inbound receiving staff, bringing the site to its opening complement of 85.</li>
  <li>Addition of a second shift for outbound fulfillment, targeted for November 2026.</li>
  <li>Transportation planning and last-mile coordination roles, targeted for January 2027.</li>
  <li>Final staffing to the target complement of 160, targeted for completion by the end of the first quarter of fiscal 2027.</li>
</ol>
<div class="pagebreak"></div>

<div class="pagebreak"></div>
<div class="orphan-footer">
  <p>Terms and conditions apply.</p>
</div>
<div class="pagebreak"></div>

<div class="section-kicker">Section Five</div>
<h2>Outlook &amp; Risk Factors</h2>
<blockquote class="pull-quote">
  <p>&ldquo;Calgary is the clearest proof point we have that this operating model travels. We built the playbook in Memphis, we sharpened it in Reno, and we're already ahead of plan on the third try.&rdquo;</p>
  <footer>&mdash; Miriam Castellano, Chief Executive Officer, third-quarter earnings call</footer>
</blockquote>
<p>For the fourth quarter of fiscal 2026, management expects consolidated revenue in the range of $190 million to $196 million, and Adjusted EBITDA margin in the range of 18.5% to 19.5%. Guidance assumes the Calgary facility continues to ramp broadly in line with the schedule described in Section 4 and does not assume any incremental facility openings during the quarter.</p>
<p>Principal risk factors that could cause actual results to differ from this outlook include foreign exchange exposure related to the Canadian dollar following the Calgary opening; the possibility of renewed input cost inflation, particularly in resin-based components used in Specialty Materials; continued tightness in the Reno and Memphis labor markets; and customer concentration, with the Company's ten largest customers accounting for approximately 38% of consolidated revenue in the quarter. A prolonged slowdown in industrial capital spending, of the kind experienced in the second half of fiscal 2023, remains the scenario management monitors most closely for the Industrial Systems segment.</p>
<div class="pagebreak"></div>

<div class="pagebreak"></div>
<div class="folio-page">
  <p>14</p>
</div>
<div class="pagebreak"></div>

<div class="section-kicker">Section Six</div>
<h2>Signature &amp; Approvals</h2>
<p>The undersigned certify that this operating review has been prepared in accordance with Northgate Holdings' internal reporting standards and reflects, to the best of their knowledge, a fair presentation of the Company's results for the quarter.</p>
<div class="signature-block">
  <div class="sig-row">
    <div class="sig-cell">
      <div class="sig-line">
        <div class="sig-name">Miriam Castellano</div>
        <div class="sig-title">Chief Executive Officer</div>
      </div>
    </div>
    <div class="sig-cell">
      <div class="sig-line">
        <div class="sig-name">Devon Achterberg</div>
        <div class="sig-title">Chief Financial Officer</div>
      </div>
    </div>
  </div>
  <div class="sig-row">
    <div class="sig-cell">
      <div class="sig-line">
        <div class="sig-name">Priya Nandakumar</div>
        <div class="sig-title">Chief Operating Officer</div>
      </div>
    </div>
    <div class="sig-cell">
      <div class="sig-line">
        <div class="sig-name">Corporate Secretary</div>
        <div class="sig-title">Approved for distribution to the Board of Directors</div>
      </div>
    </div>
  </div>
</div>
<div class="pagebreak"></div>

<div class="appendix-tag">Appendix A</div>
<h2>Headcount by Location</h2>
<p>The table below supplements Section 4 with a full breakdown of quarter-end headcount by primary work location, including the Calgary facility discussed throughout this review.</p>
<table>
  <caption>Table 2. Headcount by location, as of September 30, 2026</caption>
  <thead>
    <tr>
      <th>Location</th>
      <th>Headcount</th>
      <th>% of Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Denver, CO (Headquarters)</td>
      <td>1,240</td>
      <td>36.3%</td>
    </tr>
    <tr>
      <td>Columbus, OH</td>
      <td>640</td>
      <td>18.8%</td>
    </tr>
    <tr>
      <td>Memphis, TN</td>
      <td>410</td>
      <td>12.0%</td>
    </tr>
    <tr>
      <td>Reno, NV</td>
      <td>290</td>
      <td>8.5%</td>
    </tr>
    <tr>
      <td>Calgary, AB</td>
      <td>85</td>
      <td>2.5%</td>
    </tr>
    <tr>
      <td>Remote / Field</td>
      <td>747</td>
      <td>21.9%</td>
    </tr>
    <tr class="total-row">
      <td>Total</td>
      <td>3,412</td>
      <td>100.0%</td>
    </tr>
  </tbody>
</table>
<p>This document contains forward-looking statements within the meaning of applicable securities laws, including statements regarding the Calgary facility ramp, fourth-quarter guidance, and expected supply chain outcomes. Actual results may differ materially from those anticipated. This review is intended solely for the use of the Board of Directors and should not be distributed outside the Company without the prior approval of the Corporate Secretary.</p>
`
};
