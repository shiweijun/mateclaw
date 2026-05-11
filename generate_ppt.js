const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();

// Slide dimensions
pres.defineLayout({ name: "LAYOUT", width: 13.33, height: 7.5 });
pres.layout = "LAYOUT";

// Color scheme
const COLORS = {
  primary: "1A5276",
  secondary: "2E86C1",
  accent: "28B463",
  warning: "F39C12",
  danger: "E74C3C",
  light: "EBF5FB",
  dark: "1B2631",
  white: "FFFFFF",
  gray: "85929E",
  lightGray: "F2F3F4"
};

// Helper: Add slide with title
function addSlide(title, subtitle) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.white };
  
  // Top bar
  slide.addShape("rect", {
    x: 0, y: 0, w: "100%", h: 0.8,
    fill: { color: COLORS.primary }
  });
  
  // Title
  slide.addText(title, {
    x: 0.5, y: 0.1, w: 12, h: 0.6,
    fontSize: 22, color: COLORS.white, bold: true,
    fontFace: "Microsoft YaHei", align: "left"
  });
  
  // Subtitle
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.5, y: 0.95, w: 12, h: 0.35,
      fontSize: 11, color: COLORS.gray,
      fontFace: "Microsoft YaHei", align: "left"
    });
  }
  
  // Bottom line
  slide.addShape("rect", {
    x: 0, y: 7.3, w: "100%", h: 0.03,
    fill: { color: COLORS.secondary }
  });
  
  // Footer
  slide.addText("安定灌区 · 2026年度分析汇报", {
    x: 0.5, y: 7.35, w: 6, h: 0.15,
    fontSize: 8, color: COLORS.gray,
    fontFace: "Microsoft YaHei"
  });
  
  slide.addText("数据来源: st_water_usage_record | 生成日期: 2026-05-10", {
    x: 7, y: 7.35, w: 6, h: 0.15,
    fontSize: 8, color: COLORS.gray,
    fontFace: "Microsoft YaHei", align: "right"
  });
  
  return slide;
}

// Helper: Add table
function addTable(slide, rows, x, y, w, h) {
  const tableRows = rows.map((row, i) => {
    const isHeader = i === 0;
    return row.map(cell => ({
      text: cell,
      options: {
        bold: isHeader,
        fontSize: isHeader ? 11 : 10,
        color: isHeader ? COLORS.white : COLORS.dark,
        fill: { color: isHeader ? COLORS.primary : (i % 2 === 0 ? COLORS.light : COLORS.white) },
        fontFace: "Microsoft YaHei",
        align: "center",
        valign: "middle",
        border: [{ pt: 0.5, color: "D5D8DC" }, { pt: 0.5, color: "D5D8DC" }, { pt: 0.5, color: "D5D8DC" }, { pt: 0.5, color: "D5D8DC" }]
      }
    }));
  });
  
  slide.addTable(tableRows, {
    x, y, w, h,
    colW: Array(rows[0].length).fill(w / rows[0].length),
    rowH: Array(rows.length).fill(h / rows.length)
  });
}

// Helper: Add KPI card
function addKPICard(slide, label, value, unit, x, y, w, h, color) {
  slide.addShape("rect", {
    x, y, w, h,
    fill: { color: COLORS.light },
    rectRadius: 0.1,
    line: { color, width: 2 }
  });
  
  slide.addText(label, {
    x: x + 0.1, y: y + 0.1, w: w - 0.2, h: 0.3,
    fontSize: 10, color: COLORS.gray,
    fontFace: "Microsoft YaHei", align: "center"
  });
  
  slide.addText(value, {
    x: x + 0.1, y: y + 0.4, w: w - 0.2, h: 0.5,
    fontSize: 24, color, bold: true,
    fontFace: "Microsoft YaHei", align: "center"
  });
  
  slide.addText(unit, {
    x: x + 0.1, y: y + 0.9, w: w - 0.2, h: 0.25,
    fontSize: 9, color: COLORS.gray,
    fontFace: "Microsoft YaHei", align: "center"
  });
}

// ==================== SLIDE 1: Title ====================
{
  const slide = pres.addSlide();
  slide.background = { color: COLORS.primary };
  
  slide.addShape("rect", {
    x: 0, y: 0, w: "100%", h: "100%",
    fill: { color: "1A5276", transparency: 0 }
  });
  
  slide.addShape("rect", {
    x: 0, y: 5.5, w: "100%", h: 2,
    fill: { color: COLORS.secondary }
  });
  
  slide.addText("安定灌区", {
    x: 1, y: 1.5, w: 11, h: 1,
    fontSize: 44, color: COLORS.white, bold: true,
    fontFace: "Microsoft YaHei", align: "center"
  });
  
  slide.addText("2026年度用水与收费预测分析", {
    x: 1, y: 2.5, w: 11, h: 0.8,
    fontSize: 28, color: "AED6F1",
    fontFace: "Microsoft YaHei", align: "center"
  });
  
  slide.addText("基于2025年同期数据对比与趋势预测", {
    x: 1, y: 3.5, w: 11, h: 0.5,
    fontSize: 16, color: "D4E6F1",
    fontFace: "Microsoft YaHei", align: "center"
  });
  
  slide.addText("汇报日期：2026年5月10日", {
    x: 1, y: 5.7, w: 11, h: 0.4,
    fontSize: 12, color: COLORS.white,
    fontFace: "Microsoft YaHei", align: "center"
  });
  
  slide.addText("数据来源：安定灌区刷卡用水记录系统", {
    x: 1, y: 6.2, w: 11, h: 0.4,
    fontSize: 10, color: "AED6F1",
    fontFace: "Microsoft YaHei", align: "center"
  });
}

// ==================== SLIDE 2: 核心指标概览 ====================
{
  const slide = addSlide("核心指标概览", "2025年实际 vs 2026年实际（截至5月10日）");
  
  addKPICard(slide, "2025年总用水量", "552,362", "立方米", 0.5, 1.5, 2.8, 1.3, COLORS.secondary);
  addKPICard(slide, "2026年已用水量", "165,488", "立方米", 3.6, 1.5, 2.8, 1.3, COLORS.accent);
  addKPICard(slide, "2025年总收费", "¥775,114", "元", 6.7, 1.5, 2.8, 1.3, COLORS.secondary);
  addKPICard(slide, "2026年已收费", "¥237,178", "元", 9.8, 1.5, 2.8, 1.3, COLORS.accent);
  
  const rows = [
    ["指标", "2025年实际", "2026年实际", "同比变化", "备注"],
    ["灌溉月份", "5-11月", "2-5月", "提前3个月", "春灌提前启动"],
    ["总用水量", "552,362 m³", "165,488 m³", "进行中", "仅统计至5/10"],
    ["总收费", "¥775,114", "¥237,178", "进行中", "平均水价¥1.12/m³"],
    ["活跃用户", "65 户", "58 户", "-11%", "户均用水量增加"],
    ["日均用水(5月)", "1,988 m³/天", "5,897 m³/天", "+197%", "用水强度显著提升"]
  ];
  addTable(slide, rows, 0.5, 3.2, 12.3, 3.2);
}

// ==================== SLIDE 3: 月度用水量对比 ====================
{
  const slide = addSlide("月度用水量对比", "2025年实际 vs 2026年实际与预测");
  
  const rows = [
    ["月份", "2025年实际", "2026年实际", "2026年预测", "同比变化"],
    ["3月", "—", "7,511", "7,511", "新增春灌"],
    ["4月", "—", "89,371", "89,371", "新增春灌"],
    ["5月", "22,886", "64,862", "165,000", "+621%"],
    ["6月", "150,153", "—", "180,000", "+20%"],
    ["7月", "164,926", "—", "198,000", "+20%"],
    ["8月", "167,224", "—", "200,000", "+20%"],
    ["9月", "45,076", "—", "54,000", "+20%"],
    ["10月", "1,082", "—", "1,300", "+20%"],
    ["11月", "1,015", "—", "1,200", "+18%"],
    ["全年合计", "552,362", "161,744", "896,382", "+62%"]
  ];
  addTable(slide, rows, 0.5, 1.4, 7.5, 5.2);
  
  slide.addShape("rect", {
    x: 8.3, y: 1.4, w: 4.5, h: 5.2,
    fill: { color: COLORS.light },
    rectRadius: 0.1,
    line: { color: COLORS.secondary, width: 1.5 }
  });
  
  slide.addText("📊 关键发现", {
    x: 8.5, y: 1.5, w: 4.1, h: 0.4,
    fontSize: 14, color: COLORS.primary, bold: true,
    fontFace: "Microsoft YaHei"
  });
  
  const insights = [
    "• 春灌提前：2026年3月即开始灌溉，4月迅速攀升至89,371 m³",
    "• 用水强度增加：5月前10天用水64,862 m³，超2025年5月全月2.8倍",
    "• 全年预测：总用水量预计达896,382 m³，比2025年增长62%",
    "• 用户数略降：活跃用户58户(-11%)，但户均用水量大幅增加",
    "• 用水模式变化：从单峰(7-9月)转向双峰(4-5月春灌+7-9月夏灌)"
  ];
  
  slide.addText(insights.join("\n\n"), {
    x: 8.5, y: 2.0, w: 4.1, h: 4.4,
    fontSize: 11, color: COLORS.dark,
    fontFace: "Microsoft YaHei", lineSpacingMultiple: 1.2,
    valign: "top"
  });
}

// ==================== SLIDE 4: 收费预测分析 ====================
{
  const slide = addSlide("收费预测分析", "2026年度水费收入预测");
  
  const rows = [
    ["指标", "2025年实际", "2026年预测", "同比变化"],
    ["预测充值水量", "689,646 m³", "980,000 m³", "+42%"],
    ["预测收费总额", "¥775,114", "¥1,097,600", "+42%"],
    ["平均水价", "¥1.12/m³", "¥1.12/m³", "持平"],
    ["户均收费", "¥11,925", "¥18,924", "+59%"],
    ["月度峰值收费", "¥293,226 (6月)", "¥224,000 (8月)", "峰值后移"]
  ];
  addTable(slide, rows, 0.5, 1.4, 7.5, 3.2);
  
  slide.addText("月度收费预测明细", {
    x: 0.5, y: 4.8, w: 7.5, h: 0.4,
    fontSize: 13, color: COLORS.primary, bold: true,
    fontFace: "Microsoft YaHei"
  });
  
  const feeRows = [
    ["月份", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月"],
    ["预测收费(元)", "45,766", "127,160", "184,800", "201,600", "221,760", "224,000", "60,480", "1,456", "1,344"]
  ];
  addTable(slide, feeRows, 0.5, 5.3, 7.5, 1.2);
  
  slide.addShape("rect", {
    x: 8.3, y: 1.4, w: 4.5, h: 5.1,
    fill: { color: "FEF9E7" },
    rectRadius: 0.1,
    line: { color: COLORS.warning, width: 1.5 }
  });
  
  slide.addText("⚠️ 管理建议", {
    x: 8.5, y: 1.5, w: 4.1, h: 0.4,
    fontSize: 14, color: COLORS.warning, bold: true,
    fontFace: "Microsoft YaHei"
  });
  
  const recs = [
    "1. 水源保障：密切关注5-7月用水高峰，确保水源充足",
    "2. 水价策略：考虑阶梯水价，应对用水量大幅增长",
    "3. 用户管理：加强用水监管，避免浪费",
    "4. 设备维护：提前检修泵站、渠道，应对高负荷运行",
    "5. 收费管理：优化收费流程，提高收缴效率"
  ];
  
  slide.addText(recs.join("\n\n"), {
    x: 8.5, y: 2.0, w: 4.1, h: 4.3,
    fontSize: 11, color: COLORS.dark,
    fontFace: "Microsoft YaHei", lineSpacingMultiple: 1.2,
    valign: "top"
  });
}

// ==================== SLIDE 5: 趋势图表 ====================
{
  const slide = addSlide("用水趋势可视化", "月度用水量对比与预测");
  
  const chartData = [
    {
      name: "2025年实际",
      labels: ["3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月"],
      values: [0, 0, 22886, 150153, 164926, 167224, 45076, 1082, 1015]
    },
    {
      name: "2026年实际",
      labels: ["3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月"],
      values: [7511, 89371, 64862, null, null, null, null, null, null]
    },
    {
      name: "2026年预测",
      labels: ["3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月"],
      values: [7511, 89371, 165000, 180000, 198000, 200000, 54000, 1300, 1200]
    }
  ];
  
  slide.addChart(pres.ChartType.bar, chartData, {
    x: 0.5, y: 1.4, w: 7.5, h: 4.5,
    showTitle: true,
    title: "月度用水量对比 (m³)",
    showLegend: true,
    legendPos: "b",
    catAxisLabelFontSize: 10,
    valAxisLabelFontSize: 10,
    valGridLine: { color: "E5E7E9", width: 0.5 },
    barDir: "col",
    gapWidth: 50,
    shadow: { type: "outer", blur: 4, offset: 2, color: "BDC3C7" }
  });
  
  slide.addShape("rect", {
    x: 8.3, y: 1.4, w: 4.5, h: 4.5,
    fill: { color: COLORS.light },
    rectRadius: 0.1,
    line: { color: COLORS.accent, width: 1.5 }
  });
  
  slide.addText("📈 趋势总结", {
    x: 8.5, y: 1.5, w: 4.1, h: 0.4,
    fontSize: 14, color: COLORS.accent, bold: true,
    fontFace: "Microsoft YaHei"
  });
  
  const summary = [
    "用水模式转变：\n从单峰型(7-9月)转向双峰型(4-5月+7-9月)",
    "春灌强度：\n2026年春灌(3-5月)预计261,882 m³，占全年29%",
    "夏灌预测：\n6-8月预计578,000 m³，占全年65%",
    "秋灌尾声：\n9-11月预计56,500 m³，占全年6%",
    "峰值月份：\n预计8月达200,000 m³，为全年最高"
  ];
  
  slide.addText(summary.join("\n\n"), {
    x: 8.5, y: 2.0, w: 4.1, h: 3.8,
    fontSize: 11, color: COLORS.dark,
    fontFace: "Microsoft YaHei", lineSpacingMultiple: 1.2,
    valign: "top"
  });
  
  slide.addText("注：2025年5月数据仅含5天(5/26-5/31)，2026年5月数据含10天(5/1-5/10)", {
    x: 0.5, y: 6.2, w: 12.3, h: 0.3,
    fontSize: 9, color: COLORS.gray, italic: true,
    fontFace: "Microsoft YaHei"
  });
}

// ==================== SLIDE 6: 结论与建议 ====================
{
  const slide = addSlide("结论与建议", "2026年度灌溉管理策略");
  
  slide.addShape("rect", {
    x: 0.5, y: 1.4, w: 6, h: 3.2,
    fill: { color: "E8F8F5" },
    rectRadius: 0.1,
    line: { color: COLORS.accent, width: 1.5 }
  });
  
  slide.addText("✅ 核心结论", {
    x: 0.7, y: 1.5, w: 5.6, h: 0.4,
    fontSize: 16, color: COLORS.accent, bold: true,
    fontFace: "Microsoft YaHei"
  });
  
  const conclusions = [
    "1. 用水量大幅增长：2026年预计总用水量896,382 m³，较2025年增长62%",
    "2. 灌溉季延长：从7个月(5-11月)延长至10个月(2-11月)",
    "3. 用水强度提升：日均用水量从1,988 m³增至5,897 m³(+197%)",
    "4. 收费收入增加：预计全年收费¥1,097,600，增长42%",
    "5. 用户结构变化：活跃用户减少11%，但户均用水量增加83%"
  ];
  
  slide.addText(conclusions.join("\n\n"), {
    x: 0.7, y: 2.0, w: 5.6, h: 2.5,
    fontSize: 11, color: COLORS.dark,
    fontFace: "Microsoft YaHei", lineSpacingMultiple: 1.2,
    valign: "top"
  });
  
  slide.addShape("rect", {
    x: 6.8, y: 1.4, w: 6, h: 3.2,
    fill: { color: "FEF9E7" },
    rectRadius: 0.1,
    line: { color: COLORS.warning, width: 1.5 }
  });
  
  slide.addText("⚠️ 管理建议", {
    x: 7.0, y: 1.5, w: 5.6, h: 0.4,
    fontSize: 16, color: COLORS.warning, bold: true,
    fontFace: "Microsoft YaHei"
  });
  
  const recommendations = [
    "1. 水源保障：提前蓄水，确保5-8月高峰供水",
    "2. 水价优化：考虑阶梯水价，引导合理用水",
    "3. 设备维护：春灌前完成泵站、渠道检修",
    "4. 用户服务：加强用水指导，减少浪费",
    "5. 数据监控：建立实时用水监测预警机制"
  ];
  
  slide.addText(recommendations.join("\n\n"), {
    x: 7.0, y: 2.0, w: 5.6, h: 2.5,
    fontSize: 11, color: COLORS.dark,
    fontFace: "Microsoft YaHei", lineSpacingMultiple: 1.2,
    valign: "top"
  });
  
  slide.addShape("rect", {
    x: 0.5, y: 4.9, w: 12.3, h: 2.0,
    fill: { color: COLORS.light },
    rectRadius: 0.1,
    line: { color: COLORS.secondary, width: 1.5 }
  });
  
  slide.addText("📋 下一步行动", {
    x: 0.7, y: 5.0, w: 11.9, h: 0.4,
    fontSize: 14, color: COLORS.secondary, bold: true,
    fontFace: "Microsoft YaHei"
  });
  
  const nextSteps = [
    "• 5月中旬：完成春灌总结报告，评估用水效率\n" +
    "• 6月初：启动夏灌准备工作，检查设备运行状态\n" +
    "• 6月中旬：召开用水管理会议，调整水价策略\n" +
    "• 7月：建立实时用水监测平台，实现数据可视化\n" +
    "• 全年：持续跟踪用水数据，优化灌溉管理策略"
  ];
  
  slide.addText(nextSteps.join("\n"), {
    x: 0.7, y: 5.5, w: 11.9, h: 1.3,
    fontSize: 11, color: COLORS.dark,
    fontFace: "Microsoft YaHei", lineSpacingMultiple: 1.2,
    valign: "top"
  });
}

// Save the presentation
pres.writeFile({ outputFileName: "安定灌区2026年度用水与收费预测分析" }).then(() => {
  console.log("PPT generated successfully!");
}).catch(err => {
  console.error("Error generating PPT:", err);
  process.exit(1);
});
