import { MY_DESCRIPTION } from "@/consts";

export default function About() {
  return (
    <section id="about" className="container px-4 py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          About Me
        </h2>
        <p className="mt-4 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          {MY_DESCRIPTION}
        </p>
      </div>
    </section>
  );
}
