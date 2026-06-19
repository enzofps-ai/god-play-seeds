import { createFileRoute } from "@tanstack/react-router";
import heroKids from "@/assets/hero-kids.jpg";
import kitMockup from "@/assets/kit-mockup.jpg";
import familyImg from "@/assets/family.jpg";
import {
  BookOpen,
  Check,
  Gamepad2,
  Heart,
  ShieldCheck,
  Sparkles,
  Tv,
  Users,
  Download,
  Star,
  ArrowRight,
  Cross,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kit de Jogos Bíblicos — Aprenda sobre Deus brincando" },
      {
        name: "description",
        content:
          "Kit digital com 9 jogos bíblicos para ensinar histórias, valores e personagens da Palavra de forma divertida — longe das telas. Acesso imediato por R$9,90.",
      },
      { property: "og:title", content: "Kit de Jogos Bíblicos — Aprenda sobre Deus brincando" },
      {
        property: "og:description",
        content:
          "9 jogos prontos para imprimir e usar em casa, na EBD ou no ministério infantil. Acesso imediato por R$9,90.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "" },
    ],
  }),
  component: Index,
});

const games = [
  { name: "Uno Bíblico 2.0", src: "/images/uno-biblico-2.webp", alt: "Jogo Uno Bíblico 2.0 — cartas bíblicas para crianças" },
  { name: "Jogo Mímico Bíblico", src: "/images/jogo-mimico-biblico.webp", alt: "Jogo Mímico Bíblico — atividade de mímica com histórias da Bíblia" },
  { name: "Passatempo Bíblico", src: "/images/passatempo-biblico.webp", alt: "Passatempo Bíblico — caça-palavras, labirinto e atividades cristãs" },
  { name: "Super Trunfo Personagens", src: "/images/super-trunfo-personagens.webp", alt: "Super Trunfo Personagens Bíblicos — cartas colecionáveis" },
  { name: "Encontre", src: "/images/encontre.webp", alt: "Encontre — desafio bíblico de descobrir e aprender brincando" },
  { name: "Spot It Bíblico", src: "/images/spot-it-biblico.webp", alt: "Spot It Bíblico — jogo de atenção com símbolos cristãos" },
  { name: "Siga a Cristo", src: "/images/siga-a-cristo.webp", alt: "Siga a Cristo — jogo de tabuleiro cristão para crianças" },
  { name: "Quiz Bíblico", src: "/images/quiz-biblico.webp", alt: "Quiz Bíblico — perguntas e respostas sobre a Palavra de Deus" },
  { name: "Uno da Fé", src: "/images/uno-da-fe.webp", alt: "Uno da Fé — jogo cristão de cartas para toda a família" },
];

const benefits = [
  { icon: BookOpen, text: "Conhecimento bíblico" },
  { icon: Sparkles, text: "Atenção e concentração" },
  { icon: Heart, text: "Valores cristãos" },
  { icon: Users, text: "Interação em família" },
  { icon: Tv, text: "Menos tempo nas telas" },
  { icon: ShieldCheck, text: "Memória e raciocínio" },
];

const audiences = [
  "Mães e pais cristãos",
  "Professoras de EBD",
  "Líderes de célula infantil",
  "Ministério infantil",
  "Famílias que querem menos telas",
  "Igrejas com atividades prontas",
];

function CTAButton({ children = "Quero Receber o Kit Agora" }: { children?: React.ReactNode }) {
  return (
    <a href="#oferta" className="btn-cta">
      {children}
      <ArrowRight className="h-5 w-5" />
    </a>
  );
}

function Index() {
  return (
    <main className="bg-background text-foreground">
      {/* NAV */}
      <header className="absolute top-0 left-0 right-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2 text-cream">
            <Cross className="h-5 w-5 text-gold" />
            <span className="font-display text-lg font-semibold">Jornada da Fé</span>
          </div>
          <a
            href="#oferta"
            className="hidden rounded-full border border-white/20 px-4 py-2 text-sm text-cream backdrop-blur-md hover:bg-white/10 sm:inline-flex"
          >
            Garantir kit
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-deep pb-24 pt-32 text-cream md:pb-32 md:pt-40">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 20% 0%, oklch(0.45 0.15 75 / 0.45), transparent 50%), radial-gradient(circle at 90% 80%, oklch(0.35 0.12 260 / 0.6), transparent 55%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <span className="chip">
              <Sparkles className="h-3.5 w-3.5 text-gold" /> Material digital cristão para crianças
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] md:text-6xl">
              Jogos Bíblicos para crianças aprenderem sobre{" "}
              <span className="text-gold">Deus</span> longe das telas
            </h1>
            <p className="mt-6 max-w-xl text-lg text-cream/80">
              Um kit divertido e educativo para ensinar histórias, personagens e valores bíblicos em
              casa, na EBD, célula ou ministério infantil. Brincando, a criança aprende — e troca o
              celular por momentos cheios de propósito.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <CTAButton />
              <div className="flex items-center gap-2 text-sm text-cream/70">
                <Download className="h-4 w-4 text-gold" /> Acesso imediato após a compra
              </div>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-cream/70">
              <div className="flex items-center gap-1.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
                <span className="ml-1 text-cream/80">+1.200 famílias abençoadas</span>
              </div>
              <div className="hidden h-4 w-px bg-white/20 sm:block" />
              <span>9 jogos prontos para imprimir</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-gold/30 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 shadow-2xl">
              <img
                src={heroKids}
                alt="Crianças felizes jogando jogos bíblicos juntos"
                width={1536}
                height={1152}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-cream p-4 text-deep shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-gold/20 p-2">
                  <Gamepad2 className="h-5 w-5 text-deep" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    Kit completo
                  </div>
                  <div className="font-display text-lg font-semibold">9 Jogos Bíblicos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <span className="section-eyebrow">A realidade hoje</span>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            As crianças estão sendo ensinadas todos os dias. <br className="hidden md:block" />
            <span className="italic text-gold">A pergunta é: por quem?</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Cada vez mais comum ver crianças passando horas no celular, presas em telas e com pouca
            paciência para o que importa. A infância é o solo onde valores, hábitos e referências
            germinam — o que ela aprende agora pode acompanhá-la por muitos anos.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Ensinar sobre Deus, Jesus, amor, obediência, perdão e fé de uma forma leve e divertida
            planta sementes valiosas no coração dela.
          </p>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="bg-secondary/60 px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <img
              src={familyImg}
              alt="Família reunida brincando e aprendendo a Bíblia"
              loading="lazy"
              width={1280}
              height={896}
              className="rounded-3xl shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 hidden max-w-[16rem] rounded-2xl border bg-card p-5 shadow-xl md:block">
              <Heart className="h-6 w-6 text-gold" />
              <p className="mt-2 text-sm text-card-foreground">
                "Em vez de tela, escolhemos a Palavra — em forma de brincadeira."
              </p>
            </div>
          </div>
          <div>
            <span className="section-eyebrow">A solução</span>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              Uma forma divertida de ensinar a Bíblia sem depender do celular
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              O Kit de Jogos Bíblicos transforma o aprendizado em brincadeira. Em vez de só falar e
              esperar atenção, você oferece desafios, perguntas e dinâmicas que envolvem a criança
              naturalmente.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Ela brinca, participa, interage — e aprende sobre a Palavra de Deus ao mesmo tempo.
            </p>
            <div className="mt-8">
              <CTAButton>Quero ensinar brincando</CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <span className="section-eyebrow">O que vem no kit</span>
              <h2 className="mt-4 text-3xl font-bold md:text-5xl">
                9 jogos bíblicos, prontos para imprimir e brincar
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Perguntas, desafios, personagens, atividades visuais e dinâmicas — feitos para
                deixar o aprendizado leve, divertido e participativo.
              </p>
              <img
                src={kitMockup}
                alt="Mockup do kit de jogos bíblicos digital"
                loading="lazy"
                width={1280}
                height={1280}
                className="mt-10 rounded-3xl shadow-lg"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border bg-card shadow-lg">
              <div className="relative">
                <div
                  className="flex animate-carousel"
                  style={{ width: `${games.length * 2 * 280}px` }}
                >
                  {[...games, ...games].map((game, i) => (
                    <div
                      key={`${game.name}-${i}`}
                      className="relative flex-shrink-0 overflow-hidden"
                      style={{ width: "280px", height: "280px" }}
                    >
                      <img
                        src={game.src}
                        alt={game.alt}
                        loading="lazy"
                        decoding="async"
                        width={400}
                        height={400}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-deep/80 to-transparent px-3 py-2">
                        <span className="text-xs font-semibold text-cream">{game.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-deep px-6 py-24 text-cream md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <span className="section-eyebrow text-gold">Muito mais que brincadeira</span>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              Cada jogo desenvolve algo valioso na criança
            </h2>
            <p className="mt-5 text-cream/75">
              Enquanto muitos conteúdos digitais apenas distraem, esses jogos foram pensados para
              criar momentos com propósito.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-gold/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/20">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <p className="mt-4 text-lg font-medium">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <span className="section-eyebrow">Ideal para</span>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            Pensado para quem ensina com amor
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {audiences.map((a) => (
              <span
                key={a}
                className="rounded-full border bg-card px-5 py-2.5 text-sm font-medium text-card-foreground shadow-sm"
              >
                {a}
              </span>
            ))}
          </div>
          <p className="mt-10 text-lg text-muted-foreground">
            Use em casa, na EBD, em encontros com crianças, brincadeiras em grupo ou atividades
            especiais na igreja.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-secondary/60 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="section-eyebrow">Como funciona</span>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              Simples. Imediato. Sem complicação.
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Acesso imediato",
                desc: "Após a compra, você recebe os arquivos digitais na hora.",
                icon: Download,
              },
              {
                step: "02",
                title: "Imprima e prepare",
                desc: "Baixe, imprima se desejar e separe os jogos para usar.",
                icon: BookOpen,
              },
              {
                step: "03",
                title: "Brinque e ensine",
                desc: "Reúna as crianças e transforme a Palavra em momento especial.",
                icon: Gamepad2,
              },
            ].map((s) => (
              <div key={s.step} className="relative rounded-3xl border bg-card p-7 shadow-sm">
                <div className="font-display text-5xl text-gold/40">{s.step}</div>
                <s.icon className="absolute right-6 top-6 h-6 w-6 text-deep/40" />
                <h3 className="mt-2 text-xl font-semibold text-card-foreground">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Importante: este é um produto digital. Nenhum item físico será enviado.
          </p>
        </div>
      </section>

      {/* OFFER */}
      <section id="oferta" className="relative overflow-hidden px-6 py-24 md:py-32">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, oklch(0.92 0.08 80 / 0.7), transparent 60%)",
          }}
        />
        <div className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-[2rem] border-2 border-gold/40 bg-card p-10 text-center shadow-2xl md:p-14">
            <div
              aria-hidden
              className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-gold/30 blur-3xl"
            />
            <span className="section-eyebrow">Oferta especial de lançamento</span>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              Kit de Jogos Bíblicos completo
            </h2>
            <p className="mt-3 text-muted-foreground">Acesso imediato ao material digital</p>

            <div className="mx-auto mt-10 flex items-end justify-center gap-2">
              <span className="text-2xl text-muted-foreground line-through">R$ 47,00</span>
            </div>
            <div className="mt-1 flex items-baseline justify-center gap-2">
              <span className="font-display text-7xl font-bold text-deep md:text-8xl">
                R$9,90
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">pagamento único · acesso vitalício</p>

            <ul className="mx-auto mt-8 max-w-md space-y-3 text-left">
              {[
                "9 jogos bíblicos prontos para imprimir",
                "Atividades cristãs para todas as idades",
                "Acesso imediato em formato digital",
                "Use em casa, na EBD ou no ministério",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/30">
                    <Check className="h-3.5 w-3.5 text-deep" />
                  </div>
                  <span className="text-card-foreground">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col items-center gap-4">
              <CTAButton>Sim, quero receber agora</CTAButton>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-gold" /> Compra 100% segura · Acesso imediato
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-deep px-6 py-24 text-cream md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Cross className="mx-auto h-8 w-8 text-gold" />
          <h2 className="mt-6 text-3xl font-bold md:text-5xl">
            Dê às crianças uma alternativa melhor do que apenas telas
          </h2>
          <p className="mt-6 text-lg text-cream/75">
            A infância passa rápido. Cada momento pode ser uma oportunidade de ensinar algo bom,
            criar memórias e aproximar as crianças da Palavra de Deus.
          </p>
          <div className="mt-10">
            <CTAButton>Sim, quero receber os Jogos Bíblicos</CTAButton>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 bg-deep px-6 py-10 text-center text-sm text-cream/50">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <Cross className="h-4 w-4 text-gold" />
            <span className="font-display text-cream">Jornada da Fé</span>
          </div>
          <p>© {new Date().getFullYear()} Jornada da Fé · Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
