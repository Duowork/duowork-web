import Container from "../components/Container";
import Button from "../components/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-white pt-[clamp(140px,20vw,200px)] pb-[clamp(64px,9vw,120px)]">
      <Container>
        <p className="text-[13px] font-medium tracking-[0.04em] text-ink-60 uppercase">
          404
        </p>

        <h1 className="mt-4 max-w-[16ch] font-title text-[clamp(38px,4.2vw,56px)] leading-[1.1] font-semibold tracking-[-0.01em]">
          That page isn't here.
        </h1>

        <p className="mt-5 max-w-[52ch] text-lg text-ink-60">
          The link may be old, or the page may have moved. Everything we build is
          still one click away.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/" variant="primary" icon="arrowRight">
            Back home
          </Button>
          <Button to="/work" variant="secondary">
            See Our Work
          </Button>
        </div>
      </Container>
    </section>
  );
}
