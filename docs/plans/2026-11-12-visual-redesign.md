# 个人网站 Redesign 计划

- 日期：2026-11-12（修订 2）
- 分支：`refactor-1112`（基于 `main`）
- 状态：阶段 0–7 已在 `refactor-1112` 上实施（未提交）；第 10 节的 D1–D7 均按建议执行，阶段 8（Ask 助手）未做
- 范围：全站视觉、版式与"AI 可读层"——设计 token、字体、导航/页脚、首页、Projects、Blog、文章页、Experience、404。不改 URL、不改部署方式。

**修订记录**

| 版本 | 变化 |
|---|---|
| 1 | 方向为 "engineering notebook"：暖白纸面、亮色优先、细线、行式列表，延续你之前的静态稿 v3。 |
| 2（本版） | 按你的要求改为 **2026 年全栈 + AI 工程师** 方向：暗色优先、控制台质感、prompt bar 作为签名元素，并新增让 AI agent 能读这个站的功能层。第 2 节的现状审视不变，第 3 节起全部重写。 |

---

## 1. 目标与定位

**定位：一个在 2026 年同时做全栈产品和 AI 应用的工程师。** 这个定位有内容支撑，不是贴标签：现职在 OODARIS AI；项目里有 MCP server（CLI MCP）、Gemini 聊天应用（AI Chat）、跑在 Cloudflare Workers + D1 上的全栈系统（ITRI Survey）；黑客松做过 AI 报税 agent（TaxAgentServer）和 AI 对话游戏（MTLove）。

访客是招聘方、技术负责人和同行，典型行为是 30 秒内扫一眼。Redesign 要做到四件事：

1. **第一眼就读出"全栈 + AI"**，而不是一个通用的 web 开发者模板站。
2. **用站点本身证明能力**：2026 年的 AI 工程师，自己的站应该是 agent 可读、键盘可达、性能干净的。功能即设计。
3. **内容更快被读到**：项目和经历的结果数字（40% 性能提升、加载时间降 90%）要被看见。
4. **成体系**：颜色、字号、间距收敛成 token，亮暗两套，以后加内容不再逐处手调。

非目标：不加动效库，不引入 CMS，不做 i18n，不改内容集合以外的信息架构。

## 2. 现状审视

基于通读 `src/` 全部代码，并在本地 dev server 上以 375px 和约 1024px 宽度逐页查看。≥1440px 的宽屏表现是从代码推断的，未截图验证。

### 2.1 视觉层面

| # | 问题 | 位置 |
|---|------|------|
| V1 | **没有品牌色，也没有自己的设计语言。** `global.css` 是 shadcn neutral 原样；唯一的颜色来自零散硬编码：`#2fafda`、`#42b883`、Skills 的蓝/绿/橙/紫、Blog 徽章 emerald，五种"强调色"互不相干。 | `Hero.tsx`、`experience/index.astro`、`Skills.tsx`、`RecentBlogs.tsx` |
| V2 | **版式单调。** 首页 5 个区块全是"居中 48px 标题 + 灰色副标题 + 卡片网格"。 | `components/home/*` |
| V3 | **Hero 占满一屏却很空。** `min-h-screen` 垂直居中，项目完全在首屏以下；"Hello, I am ..." 是排在 `h1` 之前的 `h2`。 | `Hero.tsx` |
| V4 | **About 只有一段居中文字**，文案有语病，没有可扫读的事实；全站没有任何一处提到 AI。 | `About.tsx`、`consts.ts` |
| V5 | **卡片不适合现有内容量。** Blog 只有 1 篇，三列网格里孤零零一张卡；项目卡没有图，每张都显示无意义的 "1 min read"。 | `Projects.tsx`、`RecentBlogs.tsx`、列表页 |
| V6 | **文章页行宽失控。** `max-w-7xl` + `prose max-w-none`，桌面端一行远超 100 字符。 | `ArticleLayout.astro` |
| V7 | **Experience 页是裸 Markdown**，用 `<br/>` 和 `---` 手工排版，没有时间线结构。 | `content/experience/index.md` |
| V8 | **区块分隔几乎不可见**，`bg-muted/50` 叠在 `bg-gray-50` 上，且宽屏不通栏。 | `Skills.tsx`、`Contact.astro` |
| V9 | **字体只有 400/700 两档**，没有等宽字体的系统用法。 | `global.css` |
| V10 | **分享卡片**用头像配 `summary_large_image`，贴出去是被裁切的大头照。 | `BaseLayout.astro` |

### 2.2 体系与工程层面

| # | 问题 | 位置 |
|---|------|------|
| S1 | **约 70 处硬编码颜色**分布在 14 个文件。暗色 token 已定义但从未启用，启用即崩。 | `Skills.tsx` 34 处最多 |
| S2 | 同一串 600 多字符的 `prose-*` class 复制了两份，其中 `text-article-primary` 是不存在的 token。 | `ArticleLayout.astro`、`experience/index.astro` |
| S3 | 首页 6 个水合岛，其中 `Projects` 和 `RecentBlogs` 是纯展示组件。 | `ProjectsComponent.astro`、`RecentBlogsComponent.astro` |
| S4 | Hero 图片直出 177KB 的 864×1184 JPEG，没走 Astro 图片优化。 | `Hero.tsx` |
| S5 | 字体是 `.woff` 而非 `.woff2`。 | `public/fonts/` |
| S6 | 站点对 AI agent 不友好：没有 `llms.txt`，没有结构化数据，RSS 链接还是坏的。 | `public/`、`BaseHead.astro`、`rss.xml.js` |

### 2.3 顺带发现的 bug（阶段 0 修掉）

- **404 页按钮 hover 后文字消失**：`text-white` + `hover:bg-secondary`。
- **Blog 的 "Featured Post" 永远不显示**：frontmatter 写 `featured`，schema 读 `isFeatured`。
- **日期差一天**：`2026-01-06` 显示成 "Jan 5, 2026"（`FormattedDate` 用了本地时区）。
- **RSS 链接 404**：`rss.xml.js` 用 `post.id` 拼链接，实际路由用 `slug`。
- **页脚在中等宽度下贴边**：`container` 没有水平 padding。
- **移动端菜单硬编码 `bg-white`**；`CopyButton` 在代码块上的 `aria-label` 仍是 "Copy email"。
- 内容疑点：Experience 里 WatsonBio / Insurfact 写着 "- Present"，但所属合同已于 Jan 2026 结束。

### 2.4 值得保留的

- Astro 全站预渲染、内容集合、测试齐全；构建/单测/类型检查当前全部通过。
- 已经部署在 Cloudflare Workers 上，以后要加服务端能力（比如问答接口）不需要换架构。
- `CopyButton` 的勾选描线动画。
- 内容真实且有数据。

## 3. 设计方向：Console

> **暗色优先的工程控制台。** 近黑底、发丝线、等宽标注、一个高亮的信号绿；首页的核心交互是一条 prompt bar——人用它跳转和搜索，agent 用 `llms.txt` 读同一份内容。

为什么是这个方向：

- 2026 年开发者日常待的地方——编辑器、终端、agent 面板、部署控制台——都是这套视觉语言。用它，访客不需要读文字就知道这是"做这行的人"。
- **Prompt bar 是这个时代的签名交互。** 把它放在 Hero 里，本身就在说"AI 工程师"，而且是个真能用的功能，不是装饰。
- 暗底上，一种高饱和强调色就够有辨识度，不需要渐变和插画。

### 3.1 三条原则

1. **功能即设计。** 每个"AI 感"元素都必须真的能用：prompt bar 能跳转，状态点反映真实信息，"Copy as Markdown" 真的复制出 Markdown。不能用的不放。
2. **一种强调色，只标"活的"东西。** 信号绿只出现在：状态点、当前导航项、主按钮、链接、焦点环、数字高亮。不做大面积填充。
3. **等宽字只做标注。** 日期、编号、技术栈、键位、路径用 mono；标题和正文用 sans。

### 3.2 明确不要的东西

这个方向最大的风险是做成"AI 模板站"。以下一律不用：

- 紫蓝渐变、极光背景、毛玻璃卡片堆叠。
- 到处的 ✨ 火花图标、"Powered by AI" 徽章。
- 循环播放的打字机效果、假终端窗口（红黄绿三个圆点）、矩阵雨、粒子。
- 技能熟练度条、访客计数。
- 滚动劫持和整页入场动画。

### 3.3 签名元素（只有四个）

| 元素 | 说明 |
|---|---|
| **Prompt bar** | Hero 里的输入条 + 全站 `⌘K`。打开命令面板，可跳转页面/项目、复制邮箱、下载简历、切换主题。 |
| **状态胶囊** | `● Building at OODARIS AI`，绿点缓慢呼吸。内容取自 `content/experience`。 |
| **点阵底纹** | Hero 背后一层径向遮罩的点阵 + 一处很淡的绿色光晕。全站只出现这一次。 |
| **Mono 区块标记** | 每个区块标题上方一行 `// 02 · selected-work`。 |

## 4. 设计系统

### 4.1 颜色 token

沿用 shadcn 的变量名，不动 `components/ui/*`。shadcn 的 `--accent` 是"hover 底色"的意思，所以品牌绿另起名 `--brand`。中性色带一点冷调（hue 260）。

`<html>` 默认带 `class="dark"`，所以 `.dark` 是主主题，`:root` 是亮色。

```css
.dark {
  --background: oklch(0.155 0.006 260);      /* 页面底 */
  --card: oklch(0.19 0.007 260);             /* 卡片、bento 格 */
  --popover: oklch(0.215 0.008 260);         /* 命令面板、浮层 */
  --muted: oklch(0.235 0.008 260);           /* chip 底、hover 底、行内代码底 */
  --secondary: oklch(0.235 0.008 260);
  --accent: oklch(0.235 0.008 260);          /* shadcn 语义：hover 表面 */
  --foreground: oklch(0.97 0.003 260);       /* 标题、强调文字 */
  --foreground-soft: oklch(0.83 0.006 260);  /* 新增：正文 */
  --muted-foreground: oklch(0.67 0.01 260);  /* 元信息 */
  --border: oklch(1 0 0 / 0.09);             /* 发丝线 */
  --border-strong: oklch(1 0 0 / 0.18);      /* 新增：hover、输入框 */
  --input: oklch(1 0 0 / 0.12);
  --brand: oklch(0.82 0.17 155);             /* 新增：信号绿 */
  --brand-ink: oklch(0.82 0.17 155);         /* 新增：绿色文字（暗色下同 brand） */
  --brand-soft: oklch(0.82 0.17 155 / 0.12); /* 新增：标签底、光晕 */
  --primary: var(--brand);                   /* 主按钮：绿底深字 */
  --primary-foreground: oklch(0.155 0.006 260);
  --ring: var(--brand);
}

:root {
  --radius: 0.625rem;                        /* 不变：控件 8px，卡片 10–14px */
  --background: oklch(0.985 0.002 260);
  --card: oklch(1 0 0);
  --popover: oklch(1 0 0);
  --muted: oklch(0.955 0.004 260);
  --secondary: oklch(0.955 0.004 260);
  --accent: oklch(0.955 0.004 260);
  --foreground: oklch(0.18 0.01 260);
  --foreground-soft: oklch(0.34 0.01 260);
  --muted-foreground: oklch(0.50 0.012 260);
  --border: oklch(0.18 0.01 260 / 0.10);
  --border-strong: oklch(0.18 0.01 260 / 0.22);
  --input: oklch(0.18 0.01 260 / 0.14);
  --brand: oklch(0.62 0.16 155);             /* 亮色下只做图形 */
  --brand-ink: oklch(0.44 0.13 155);         /* 亮色下的绿色文字 */
  --brand-soft: oklch(0.62 0.16 155 / 0.12);
  --primary: oklch(0.18 0.01 260);           /* 亮色主按钮：深底浅字 */
  --primary-foreground: oklch(0.985 0.002 260);
  --ring: var(--brand-ink);
}
```

`@theme inline` 补上 `--color-foreground-soft`、`--color-border-strong`、`--color-brand`、`--color-brand-ink`、`--color-brand-soft`。用不到的 `chart-*`、`sidebar-*` 删除。

**对比度**（手算估值，实施时用工具逐项复核）：

| 组合 | 暗色 | 亮色 | 备注 |
|---|---|---|---|
| `foreground` / `background` | ≈ 18:1 | ≈ 17:1 | |
| `foreground-soft` / `background` | ≈ 11:1 | ≈ 11:1 | 正文 |
| `muted-foreground` / `background` | ≈ 6.2:1 | ≈ 5.7:1 | 元信息 |
| `muted-foreground` / `card` | ≈ 5.8:1 | ≈ 6:1 | |
| `brand-ink` / `background` | ≈ 11:1 | ≈ 7:1 | 绿色文字一律用 `brand-ink` |
| `primary-foreground` / `primary` | ≈ 11:1 | ≈ 17:1 | 主按钮文字 |
| `brand` / `background`（亮色） | — | ≈ 3.7:1 | **亮色下 `brand` 只能做图形，不能做文字，也不能承载白字** |

### 4.2 字体

- **Sans**：Geist（可变字重）。**Mono**：Geist Mono。这对字体是这类界面的当代默认，字形紧凑，数字和标点在小字号下很清楚。
- 备选：Inter + JetBrains Mono（与你之前的静态稿一致）。见决策 D2。
- 自托管 `.woff2`，Latin 子集，`font-display: swap`，preload sans。实施时先确认字重范围、许可和子集体积。
- 现有的 Atkinson `.woff` 文件移除。

| 角色 | 字号 | 行高 | 字距 | 字重 | 字体 |
|---|---|---|---|---|---|
| display（Hero 名字） | `clamp(2.75rem, 6vw, 4.75rem)` | 1.0 | -0.04em | 600 | sans |
| page-title（内页 h1） | `clamp(2.25rem, 5vw, 3.75rem)` | 1.05 | -0.035em | 600 | sans |
| lead（Hero 副标题） | `clamp(1.25rem, 2.4vw, 1.75rem)` | 1.3 | -0.02em | 400 | sans |
| h2 | 1.75rem | 1.2 | -0.02em | 600 | sans |
| h3 | 1.125rem | 1.3 | -0.01em | 600 | sans |
| body | 1rem | 1.6 | 0 | 400 | sans |
| prose（文章正文） | 1.0625rem | 1.75 | 0 | 400 | sans |
| meta | 0.8125rem | 1.5 | 0 | 400–500 | mono |
| label（区块标记、键位） | 0.75rem | 1.4 | 0.04em | 500 | mono |

数字用 `font-variant-numeric: tabular-nums`。标题 `text-wrap: balance`，段落 `text-wrap: pretty`。等宽字最小 12px。

### 4.3 版式与间距

- 容器 `.wrap`：`max-width: 1120px`，gutter 移动端 20px、≥768px 为 32px。全站一种容器宽度；文章正文再限制到 `68ch`。
- 区块纵向间距：移动端 64px，桌面 96px。区块之间靠留白和 mono 标记分隔，不用交替底色。
- 间距刻度：4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96。
- Bento 网格：桌面 6 列、`gap: 12px`；平板 2 列；手机 1 列。

### 4.4 形状、层次、动效

- 圆角：控件 8px，卡片 14px，胶囊全圆。
- 层次靠**边线和表面明度**，不靠投影：`background` → `card` → `popover` 三级；卡片 1px `border`，顶边加一条 `inset 0 1px 0 oklch(1 0 0 / 0.04)` 的高光。
- 可点卡片 hover：边线变 `border-strong`，标题旁的 `↗` 位移 2px。没有放大、没有阴影扩散。
- 过渡 120–200ms，只动 `transform` / `opacity` / `border-color` / `background-color`。
- 页面切换用浏览器原生 view transition（`@view-transition { navigation: auto; }`，纯 CSS，不支持的浏览器自动退化）。
- 常驻动效只有状态点呼吸。`prefers-reduced-motion: reduce` 下全部停掉，`scroll-behavior: smooth` 同样受此控制。

### 4.5 基础组件

新增到 `src/components/common/`，除命令面板外全部是零 JS 的 `.astro`：

| 组件 | 说明 |
|---|---|
| `Section.astro` | `<section>` + `.wrap` + 纵向间距，接受 `id` |
| `SectionHead.astro` | mono 标记行（`// 02 · selected-work`）+ `h2` + 右侧链接 |
| `PageHead.astro` | 内页头部：mono 路径（`~/projects`）· `h1` · 导语 · 右侧统计 |
| `Card.astro` / `BentoCell.astro` | 表面 + 发丝线 + 顶边高光；`BentoCell` 接受列跨度 |
| `Chip.astro` | mono 12px 标签；`tone="brand"` 用于 AI 相关标签 |
| `StatusPill.astro` | 绿点 + 一行文字 |
| `Kbd.astro` | 键位标记 `⌘K` |
| `Row.astro` | 行式列表项，整行可点 |
| `BrowserFrame.astro` | 项目截图外框：一条细顶栏 + mono 域名，没有红黄绿圆点 |
| `Prose.astro` | 收敛重复的 `prose-*` class，样式写进 `global.css` |
| `CommandPalette` | 见 5.1；原生 `<dialog>` + 内联脚本，不引入依赖 |

`ui/button.tsx` 的 `cva` 保留现有 class（单测断言 `bg-primary`、`border`、`h-8`、`h-10`），主按钮的绿底由 `--primary` token 自动带来。

## 5. AI 时代的功能层

这一节是相对修订 1 新增的。它们是这次 redesign 的一部分，不是可有可无的点缀——"AI 工程师"的定位主要靠这里证明。

### 5.1 命令面板（必做）

- 入口：Hero 的 prompt bar、导航里的 `⌘K` 按钮、快捷键 `⌘K` / `Ctrl K` / `/`。
- 内容：页面（About / Projects / Experience / Blogs）、每个项目、每篇文章、动作（复制邮箱、下载简历、切换主题、打开 GitHub / LinkedIn）。
- 实现：构建时生成一份静态索引内联进页面；原生 `<dialog>` 负责焦点陷阱和 ESC；模糊匹配手写，十几行。不加 `cmdk` 之类的依赖。
- 可访问性：`role="combobox"` + `aria-activedescendant`，上下键选择、回车执行；触屏上就是一个普通搜索面板。
- Hero 的 prompt bar 下面放 3 个建议 chip（如 "AI projects"、"Résumé"、"Copy email"），点击直接执行，让不知道 `⌘K` 的人也能用。

### 5.2 Agent 可读层（必做）

| 产物 | 说明 |
|---|---|
| `/llms.txt` | 站点摘要 + 所有项目/文章/经历的 Markdown 链接。构建时从内容集合生成。 |
| `/projects/<slug>.md`、`/blog/<slug>.md` | 每个详情页的纯 Markdown 版本（静态端点，直接输出 `entry.body` 加 frontmatter 摘要）。 |
| "Copy as Markdown" 按钮 | 文章页和项目页头部，复用现有 `CopyButton`。 |
| JSON-LD | 首页 `Person`（姓名、职位、所在地、`sameAs` 链接），文章页 `BlogPosting`。数据全部来自 `consts.ts` 和内容集合。 |
| RSS 修复 | 链接改用 `slug`。 |

这些都是构建期产物，不增加任何运行时成本。

### 5.3 "Ask" 问答助手（可选，见决策 D7）

Prompt bar 里输入自然语言问题，由 LLM 基于本站内容回答，并附上来源链接。这是最能证明"会做 AI 应用"的东西，但它是一个要运维的功能，不只是视觉：

- 需要一个服务端接口（`src/pages/api/ask.ts`，`prerender = false`）——现有的 Cloudflare 适配器支持。
- 需要你选模型提供方并提供密钥或绑定；`wrangler.jsonc` 要改，而它是我不会擅自动的文件。
- 需要限流和防滥用（Turnstile 或按 IP 计数），system prompt 限定只回答站内内容，流式输出。
- 有持续的费用和被滥用的风险。

**建议：这一轮不做，但把 prompt bar 的交互按"以后能接上"来设计**——命令面板里没有匹配项时显示"Ask 功能即将上线"的空状态即可。视觉上线之后再单独做这个功能。

## 6. 逐页方案

### 6.1 导航与页脚

```
        ╭────────────────────────────────────────────────────────────╮
        │ ■ zhenhao.yang    About  Projects  Experience  Blogs  ⌘K ◐ │
        ╰────────────────────────────────────────────────────────────╯
```

- 顶部悬浮的胶囊导航：`popover` 底色 85% 不透明 + `backdrop-filter: blur(12px)` + 发丝线，距顶 12px，`position: sticky`。
- 当前项：文字变 `foreground`，下方一个 4px 绿点。
- 右侧：`⌘K` 按钮、主题切换。
- `Nav.tsx` 改写为 `Nav.astro` + 内联脚本，不再整页水合 React。导航链接仍在 `<nav>` 内，文字保持 `About` / `Projects` / `Experience` / `Blogs`（e2e 依赖）。
- 移动端：品牌 + `⌘K` + 菜单按钮；菜单是从顶部展开的面板，用 token 颜色，保留 ESC 关闭和滚动锁定，补上焦点管理。
- 页脚：mono 12px。左 `© {year} Zhenhao Yang`；中 `GitHub` · `LinkedIn` · `Email`（带文字）；右 `/llms.txt` · `RSS` · 当前构建的 commit 短哈希。补上 gutter。

### 6.2 首页

区块顺序：Hero → At a glance → Selected Work → Stack → Writing → Contact。

**Hero**

```
  · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · ·
  ● Building at OODARIS AI · Montreal, QC

  Zhenhao Yang                                    ╭──────────────╮
  I build full-stack web products                 │              │
  and AI-powered tools.                           │   portrait   │
                                                  │    4 : 5     │
  Full-Stack Engineer @ OODARIS AI                │              │
                                                  ╰──────────────╯
  [ View My Work → ]  [ Get In Touch ]

  ╭──────────────────────────────────────────────────╮
  │ ›  Search projects, posts, actions…          ⌘K  │
  ╰──────────────────────────────────────────────────╯
  [AI projects] [Résumé] [Copy email]        gh · in · ✉
```

- 去掉 `min-h-screen`，自然高度；首屏底部要露出 At a glance 的上沿。
- `h1` 是名字（e2e 按 "ZHENHAO YANG" 找，匹配不区分大小写）。"Hello, I am ..." 删除。
- 副标题是定位句。**注意措辞不能包含 "full-stack engineer" 这个词组**：首页 e2e 用 `getByText("Full-Stack Engineer")` 严格匹配，同一页出现两处会失败。草稿文案见上，最终文案由你定（决策 D5）。
- 职位行取自 `content/experience`，不手写。
- 头像：4:5、圆角 14px、发丝线框；用 `astro:assets` 的 `<Image>` 输出 AVIF/WebP + `srcset`，`loading="eager"`、`fetchpriority="high"`。
- 点阵底纹和光晕是纯 CSS（`radial-gradient` + `mask-image`）。

**At a glance**（bento，替代原 About）

```
╭───────────────────────────────╮╭──────────────╮╭──────────────╮
│ // about                      ││ // now       ││ // based in  │
│ 两段自我介绍（约 70 词）       ││ OODARIS AI   ││ Montreal, QC │
│                               ││ since Jan 26 ││ UTC−5        │
╰───────────────────────────────╯╰──────────────╯╰──────────────╯
╭──────────────╮╭───────────────────────────────╮╭──────────────╮
│ // background││ // building with AI           ││ // open src  │
│ Design →     ││ MCP · Gemini API ·            ││ @Allenyzh ↗  │
│ Engineering  ││ browser agents                ││              │
╰──────────────╯╰───────────────────────────────╯╰──────────────╯
```

- 六格，每格一个 mono 标签 + 一个事实。**所有内容只取 `src/content` 和 `src/data` 里已有的事实**；"building with AI" 一格列的是你项目里真实用过的东西，要补充请告诉我。
- "now" 一格只写公司，不重复职位名（同上的 e2e 约束）。

**Selected Work**（标题文字保留 "Recent Projects"，锚点 `#projects`）

- 两列大卡片，每张：`BrowserFrame` 截图 · 标题 · 一句结果（如 "Load time −90%"）· 技术 chip · Code / Live 小图标。
- AI 相关项目带绿色 `AI` chip。
- 没有截图的项目（CLI MCP、InputDateMask、Personal Website）用代码片段或 mono 大字做封面，不留空白。
- 去掉 "1 min read"；组件改为 `.astro`，去掉 `client:load`。
- 底部 "View All Projects →"（文字保留）。

**Stack**（标题文字保留 "Skills & Technologies"）

```
// 03 · stack
Skills & Technologies

AI Engineering        MCP · Gemini API · Playwright agents · …
Frontend              React · Next.js · TypeScript · Vue.js · Astro · …
Backend & Databases   Node.js · Express · Java · …
DevOps & Tools        Cloudflare · Vercel · Git
Design & UX           Figma · Adobe Suites
```

- 表格式行：左列类别名（`h3`），右列 chip。去掉四色卡片和图标色块。
- 新增第一行 **AI Engineering**。原有四个类别标题不动（e2e 依赖）。
- 内容待你确认（决策 D6）：AI 一行放什么；"Backend & Databases" 是否补上 Hono、Cloudflare D1、Drizzle、Python。

**Writing**

- 行式：日期 · 标题 + 描述 · 标签 · 阅读时长。只有 1 篇时也不显空。去掉 emerald 徽章和 `client:load`。

**Contact**（标题保留 "Let's Work Together"，锚点 `#contact`）

- 一张通栏大卡：左侧标题 + 一句话；右侧渠道行（Email + 复制 / GitHub / LinkedIn / Résumé PDF），每行 mono 标签 + 值 + `↗`。
- 邮箱文本整页只出现一次（e2e 用 `exact` 匹配）。
- `CopyButton` 颜色改用 `currentColor`，`aria-label` 跟随 `type`。

### 6.3 Projects 列表页

- `PageHead`：`~/projects` · `Projects` · 导语 · 右侧统计（项目数、年份跨度，从集合计算）。
- **Featured Project**：通栏大卡，左文右图。
- **All Projects**：分类筛选 chip（All / AI / Full-stack / Frontend / Open-source）+ 两列卡片网格。筛选是内联脚本。
- schema 新增 `projectCategories`；`redesign` 分支上已有的分类值和 `collectionFilter` 工具可以移植（移植前复核）。
- 两个 `h2` 文案 "Featured Project" / "All Projects" 保留。
- 内容建议：把 TaxAgentServer 和 MTLove 也做成项目条目——它们是你最直接的 AI 作品，目前只出现在 Experience 里。

### 6.4 Blog 列表页

- `PageHead` + 行式列表。
- 修正 `isFeatured`。规则：文章数 > 3 才渲染 Featured 区块；Featured 的那篇不在 "All Posts" 里重复（否则 e2e 按标题找链接会命中两个）。
- 保留空状态。

### 6.5 文章页（Blog 与 Project 详情共用）

```
← Back to blogs                                   [ Copy as Markdown ]

CSS Tricks: Flexbox                               ┌ On this page
Oct 12, 2025 · By Zhenhao Yang · 5 min read       │ What is flexbox
Exploring the power of Flexbox for…               │ Why using flexbox
[css] [flexbox] [web design]                      │ …
─────────────────────────────────
正文（68ch）
```

- 头部左对齐，与正文同轴；元信息一行 mono。
- 正文 `68ch`；≥`lg` 右侧 sticky 目录（用 `render()` 返回的 `headings`，零 JS）。
- `Prose` 集中定义：链接 `brand-ink` 下划线、行内代码 `bg-muted`、引用块左侧 2px 绿线、图片发丝线框、表格发丝线。
- 代码块：Shiki 亮/暗双主题随站点切换；顶部一条细栏显示语言和复制按钮。
- Prev/Next：两张并排的可点卡片；顺序改为与列表页一致。集合只有 1 篇时建议隐藏，并同步改 e2e。

### 6.6 Experience

```
  ●  Jan 2026 — Present                                     CURRENT
  │  Full-Stack Engineer
  │  OODARIS AI · Hybrid · Montreal, QC
  │
  ○  May 2025 — Jan 2026                                   CONTRACT
  │  Full-Stack Developer
  │  NeverNull Tech Inc. · Remote
  │  ╭ WatsonBio                                   Project Link ↗
  │  │ • Rebuilt entire website … 40% performance improvement
  │  ╰ C-file V2.5 – Insurfact                     Project Link ↗
  │    • … improving load time by 90%
```

- 左侧一条竖线 + 节点（当前职位是实心绿点）；右侧职位 `h3` · 公司/地点/性质 · 要点。
- 要点里的数字（`40%`、`90%`、`70%`）用 mono + `brand-ink` 高亮——它们是这一页最值得被扫到的信息。
- 需要结构化数据：把单个 `index.md` 拆成每段经历一个文件（frontmatter：`role`、`company`、`companyUrl`、`start`、`end`、`type`、`location`、`links[]`；正文为要点）。Hero 的"当前职位"改为取 `end` 为空的那条。见决策 D4。
- 不做顶部统计条，除非你提供确切数字。

### 6.7 404

- 大号 mono `404` + 原标题 "404 - Page Not Found" + 说明 + "Go to Home" 按钮 + 一行提示 "Press ⌘K to search"。修掉 hover 白字问题。

### 6.8 主题

- 默认暗色；导航里可切到亮色，写入 `localStorage`。
- `<head>` 内联脚本在首次绘制前按存储值设置 class，避免闪烁。
- `ui/sonner.tsx` 改为直接读主题，移除 `next-themes`。

### 6.9 分享卡片与 favicon

- 新做 1200×630 的 OG 图：暗底、点阵、名字大字、定位句、绿色方点。替换现在的头像。
- favicon 换成绿色方点标记（暗底），与导航品牌一致。

## 7. 实施阶段

每个阶段可独立提交、独立验证，任何阶段结束时站点都可发布。

| 阶段 | 内容 | 主要文件 |
|---|---|---|
| **0 基线与快修** | 装 Playwright 浏览器，跑通 e2e 作为基线；截图存档；修 2.3 节的 bug | `404.astro`、`flexbox.mdx`、`FormattedDate.astro`、`rss.xml.js`、`Footer.tsx` |
| **1 地基** | 颜色 token（暗+亮）、字体、基础排版、`Prose` 样式；4.5 节的静态基础组件；删除未被加载的 `tailwind.config.mjs` 并把 `components.json` 的 `tailwind.config` 置空 | `global.css`、`BaseHead.astro`、`components/common/*`、`components.json` |
| **2 外壳** | Nav、Footer、BaseLayout、主题切换与防闪烁、view transition、命令面板 | `Nav.*`、`Footer.tsx`、`BaseLayout.astro`、`ui/sonner.tsx`、`CommandPalette.*` |
| **3 首页** | Hero → At a glance → Selected Work → Stack → Writing → Contact；清掉硬编码颜色和多余的 `client:load` | `components/home/*`、`pages/index.astro`、`data/*` |
| **4 列表页** | Projects、Blog 列表；schema 加 `projectCategories`；补 `heroImg`；筛选脚本 | `pages/projects/index.astro`、`pages/blog/index.astro`、`content.config.ts`、`content/projects/*` |
| **5 文章页与 Experience** | `ArticleLayout`、目录、代码块双主题、Prev/Next；Experience 拆分与时间线 | `ArticleLayout.astro`、`NextPrevBtnGroup.astro`、`CodeBlockWithCopy.astro`、`astro.config.mjs`、`content/experience/*`、`pages/experience/index.astro` |
| **6 Agent 可读层** | `llms.txt`、`.md` 端点、Copy as Markdown、JSON-LD | `pages/llms.txt.ts`、`pages/**/[slug].md.ts`、`BaseHead.astro` |
| **7 收尾** | 404、OG 图、favicon；亮暗全站走查；可访问性走查；删死代码与无用依赖；同步更新 e2e | `404.astro`、`public/*`、`e2e/*`、`package.json` |
| **8 Ask 助手（可选）** | 见 5.3，单独立项 | `pages/api/ask.ts` 等 |

阶段 1 是其余阶段的前置。2–6 顺序可调，按表中顺序首页最早见效。

**清理清单（阶段 7）**：`components/Header.astro`、`types/blog.type.ts`、`ui/navigation-menu.tsx`、`ui/pagination.tsx`、Atkinson 字体文件；依赖 `react-autosuggest`、`next-themes`、`@radix-ui/react-navigation-menu`。`ChristmasSnow.tsx` 保留。

## 8. 验收标准

每个阶段结束都要过：

- `pnpm build`、`pnpm vitest run`、`npx tsc --noEmit` 通过。
- `pnpm test:e2e` 五个浏览器项目通过；改了文案或结构的，e2e 在同一提交里更新。
- 受影响页面在 375 / 768 / 1280 三个宽度、亮暗两个主题下截图检查；320px 无横向滚动。

整体完成时：

| 指标 | 现在 | 目标 |
|---|---|---|
| `src/` 内硬编码颜色 | 约 70 处 | 0（`ui/` 的 destructive 与 `ChristmasSnow` 除外） |
| 首页水合的 React 岛 | 6 | ≤ 3（GA、Toaster、CopyButton） |
| 文章正文行宽 | >100 字符 | ≤ 75 字符 |
| 文字对比度 | 未检查 | 亮暗主题全部达到 WCAG AA |
| 主题 | 只有亮色 | 暗色默认 + 亮色可切，无首屏闪烁 |
| 命令面板 | 无 | 纯键盘可完成"打开 → 搜索 → 跳转"；触屏可用 |
| Agent 可读 | 无 | `/llms.txt` 可访问，每个详情页有 `.md` 版本，首页有 `Person` JSON-LD |
| Lighthouse（首页，移动端） | 未测 | 四项 ≥ 95 |
| 标题层级 | 首页错误 | 每页一个 `h1`，层级连续 |

## 9. 风险

| 风险 | 应对 |
|---|---|
| 做成千篇一律的"AI 模板站" | 3.2 节的禁用清单；签名元素限定四个；每个 AI 元素必须真能用 |
| e2e 按可见文本选元素，改版容易误伤 | `AGENTS.md` 列了全部受依赖的文案；DOM 文本保持不变；严格模式下同一文本一页只出现一次（"Full-Stack Engineer"、邮箱尤其注意） |
| e2e 基线未知——本机没装 Playwright 浏览器 | 阶段 0 第一件事就是装浏览器跑一遍 |
| 字体的字重范围、许可、体积未实际验证 | 阶段 1 开头先验证；不满足退回 Inter + JetBrains Mono |
| token 色值是推算的 | 阶段 2 完成后实测对比度并微调，亮色主题单独走查一遍 |
| 默认暗色对部分访客不友好 | 亮色主题同等对待，不是事后补的；切换入口在导航里常驻 |
| 命令面板的内联脚本与 view transition、主题脚本的交互 | 用浏览器原生跨文档 view transition（不接管路由），每页脚本独立初始化 |
| Experience 拆分会动到 Hero 的数据来源 | 同一提交内改完并跑首页 e2e |

## 10. 需要你确认的决策

每项都给了建议，不回复的话我按建议执行。

| # | 决策 | 建议 | 备选 |
|---|---|---|---|
| D1 | 强调色 | 信号绿 `oklch(0.82 0.17 155)` | 琥珀橙、电光蓝（紫色系不建议，太像模板） |
| D2 | 字体 | Geist + Geist Mono | Inter + JetBrains Mono |
| D3 | 默认主题 | 默认暗色，可切亮色 | 跟随系统设置 |
| D4 | Experience 数据 | 拆成每段经历一个文件，做时间线 | 保留单个 Markdown，只优化样式 |
| D5 | 定位文案 | Hero 副标题和 About 正文由我起草、你审改；职位名仍取自 `content/experience` | 你直接给文案 |
| D6 | AI 相关内容 | Stack 新增 "AI Engineering" 一行，先只放项目里出现过的（MCP、Gemini API、Playwright agents）；TaxAgentServer、MTLove 补成项目条目 | 你给一份完整的 AI 技能清单 |
| D7 | Ask 问答助手 | 这一轮不做，prompt bar 预留位置，上线后单独立项 | 这一轮就做（需要你选模型提供方并同意修改 `wrangler.jsonc`） |

另有一处内容问题：Experience 里 WatsonBio / Insurfact 的 "- Present" 是否应改为 "- Jan 2026"？

## 11. 明确不做

- 不改任何 URL、slug、`site`、GA ID、`wrangler.jsonc`、`robots.txt`。
- 不引入动效库、组件库或命令面板库。
- 不编造任何关于你的事实——职位、年限、数字、"available for hire" 之类的状态，都只用内容里已有的。
- 不做 i18n（`i18N` 分支另议）。
- 不处理 GA 的 cookie 同意逻辑（`analyticsEnabled` 恒为 `true`，值得另开任务，但不在这次范围）。
