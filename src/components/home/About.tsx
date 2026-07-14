import { MY_DESCRIPTION } from "@/data/consts";

export default function About() {
  interface PersonalInfo {
    label: string;
    value: string;
    link?: string;
  }

  const personalInfo: PersonalInfo[] = [
    { label: "location", value: "Montreal, QC" },
    { label: "current role", value: "Full-Stack Engineer" },
    { label: "company", value: "OODARIS AI", link: "https://oodaris.ai" },
    { label: "focus", value: "React / Vue / Python / Java" },
  ];

  return (
    <section className="border-b border-[#d9d8d3] py-14 md:py-20" id="about">
      <div className="mx-auto container px-6 md:px-10">
        <div className="mb-12 grid grid-cols-1 items-baseline gap-1 border-b border-[#d9d8d3] pb-5 md:grid-cols-[140px_1fr_auto] md:gap-6">
          <div className="font-mono text-[13px] text-[#6b6b66]">
            — 01 / about
          </div>
          <h2 className="m-0 text-[32px] font-semibold tracking-[-0.02em]">
            About
          </h2>
          <div className="font-mono text-xs text-[#6b6b66]">README.md</div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[140px_1fr_1fr]">
          <div className="font-mono text-xs text-[#6b6b66]">// bio</div>
          <div className="[&>p]:mb-4 [&>p:last-child]:mb-0 [&>p]:text-base [&>p]:text-[#3a3a38] [&_a]:text-[#0a0a0a] [&_a]:underline [&_a]:decoration-[oklch(0.62_0.14_150)] [&_a]:underline-offset-[3px]">
            <p>{MY_DESCRIPTION}</p>
            <p>
              Currently working as a Full-Stack Engineer at{" "}
              <a href="https://oodaris.ai" target="_blank" rel="noreferrer">
                OODARIS AI
              </a>
              . Previously contracted with NeverNull Tech on{" "}
              <a
                href="https://www.watsonbio.com/"
                target="_blank"
                rel="noreferrer"
              >
                WatsonBio
              </a>{" "}
              and the Insrfact SaaS modernization.
            </p>
          </div>
          <div className="flex flex-col border-t border-[#d9d8d3]">
            {personalInfo.map((info) => (
              <div
                key={info.label}
                className="flex justify-between border-b border-[#d9d8d3] py-[14px] font-mono text-[13px]"
              >
                <b className="font-medium text-[#0a0a0a]">{info.label}</b>
                {info.link ? (
                  <a
                    className="text-[#6b6b66]"
                    href={info.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {info.value}
                  </a>
                ) : (
                  <span className="text-[#6b6b66]">{info.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
