import { skillCategories } from "@/data/skills";

export default function Skills() {
  const totalTools = skillCategories.reduce(
    (n, c) => n + c.skills.length,
    0
  );

  return (
    <section className="border-b border-[#d9d8d3] py-14 md:py-20" id="skills">
      <div className="mx-auto container px-6 md:px-10">
        <div className="mb-12 grid grid-cols-1 items-baseline gap-1 border-b border-[#d9d8d3] pb-5 md:grid-cols-[140px_1fr_auto] md:gap-6">
          <div className="font-mono text-[13px] text-[#6b6b66]">
            — 02 / skills
          </div>
          <h2 className="m-0 text-[32px] font-semibold tracking-[-0.02em]">
            Stack &amp; Tools
          </h2>
          <div className="font-mono text-xs text-[#6b6b66]">
            {skillCategories.length} domains · {totalTools} tools
          </div>
        </div>

        <div className="flex flex-wrap gap-px border border-[#d9d8d3] bg-[#d9d8d3]">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="flex min-h-[240px] flex-1 basis-full flex-col gap-3.5 bg-[#fafaf9] p-5 transition-colors group hover:bg-[#f0efec] md:basis-[calc(50%-1px)] md:p-6 lg:basis-[calc(33.3333%-1px)]"
            >
              <div className="flex items-baseline justify-between font-mono text-xs text-[#6b6b66]">
                <category.icon className="h-4 w-4" />
                <span>{category.slug ?? category.title.toLowerCase()}</span>
              </div>
              <h3 className="m-0 text-[17px] font-semibold tracking-[-0.01em] text-[#0a0a0a]">
                {category.title}
              </h3>
              {category.description && (
                <p className="m-0 flex-1 font-mono text-[11px] leading-[1.5] text-[#6b6b66]">
                  {category.description}
                </p>
              )}
              <div className="flex flex-wrap gap-1">
                {category.skills.map((skill) => (
                  <a
                    key={skill.name}
                    href={skill.link}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-sm bg-[#f0efec] px-1.5 py-0.5 font-mono text-[10px] text-[#3a3a38] transition-colors hover:bg-[#0a0a0a] group-hover:bg-[#fafaf9] hover:text-[#fafaf9]"
                  >
                    {skill.name}
                  </a>
                ))}
              </div>
              <div className="relative mt-1 h-0.5 bg-[#d9d8d3]">
                <div
                  className="absolute left-0 top-0 h-full bg-[#0a0a0a]"
                  style={{ width: `${category.level ?? 80}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
