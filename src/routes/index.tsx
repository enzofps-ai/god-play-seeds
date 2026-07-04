import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import heroKids from "@/assets/hero-kids.webp";
import heroKids700 from "@/assets/hero-kids-700.webp";
import familyImg from "@/assets/family.webp";
import familyImg700 from "@/assets/family-700.webp";
import {
  BookOpen,
  Check,
  Gamepad2,
  Heart,
  Lock,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Tv,
  Users,
  Download,
  Star,
  ArrowRight,
  Cross,
} from "lucide-react";

const FaqAccordion = lazy(() => import("@/components/FaqAccordion"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kit de Jogos Bíblicos — Aprenda sobre Deus brincando" },
      {
        name: "description",
        content:
          "Kit digital com 8 jogos bíblicos para ensinar histórias, valores e personagens da Palavra de forma divertida — longe das telas. Acesso imediato por R$14,90.",
      },
      { property: "og:title", content: "Kit de Jogos Bíblicos — Aprenda sobre Deus brincando" },
      {
        property: "og:description",
        content:
          "8 jogos prontos para imprimir e usar em casa, na EBD ou no ministério infantil. Acesso imediato por R$14,90.",
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
  { name: "Encontre - Spot It Bíblico", src: "/images/encontre.webp", alt: "Encontre - Spot It Bíblico — jogo de atenção e observação com símbolos cristãos" },
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

const trustSignals = [
  {
    icon: Lock,
    title: "Pagamento 100% seguro",
    text: "Processado pela PerfectPay com criptografia SSL de 256 bits. Seus dados de cartão nunca passam pelos nossos servidores.",
  },
  {
    icon: RotateCcw,
    title: "Garantia de 7 dias",
    text: "Se não amar o material, é só pedir o estorno em até 7 dias após a compra e devolvemos 100% do valor pago.",
  },
  {
    icon: ShieldCheck,
    title: "Dados protegidos",
    text: "Informações pessoais e de pagamento são criptografadas de ponta a ponta e tratadas conforme a LGPD.",
  },
];

const faqs = [
  {
    q: "O material é físico ou digital?",
    a: "É 100% digital. Após a compra você recebe os arquivos na hora e pode imprimir quantas vezes quiser, em casa ou em gráfica. Nenhum item físico é enviado pelo correio.",
  },
  {
    q: "Preciso de impressora para usar?",
    a: "Não é obrigatório. Você pode imprimir em casa, em uma gráfica próxima ou usar os arquivos direto na tela do celular, tablet ou computador com as crianças.",
  },
  {
    q: "Para qual idade os jogos são indicados?",
    a: "Os jogos foram pensados para crianças em fase de alfabetização até a pré-adolescência, e também funcionam muito bem em atividades em grupo com idades variadas.",
  },
  {
    q: "Qual a diferença entre o Kit Básico e o Kit Completo?",
    a: "O Kit Básico traz 4 jogos, ideal para começar. O Kit Completo traz 8 jogos e mais variedade de dinâmicas, sendo a opção mais escolhida por quem quer aproveitar ao máximo em casa, na EBD ou no ministério infantil.",
  },
  {
    q: "O pagamento é único ou tem mensalidade?",
    a: "É um pagamento único. Você paga uma vez e tem acesso permanente aos jogos, sem cobranças recorrentes.",
  },
  {
    q: "Em quanto tempo recebo o acesso?",
    a: "Imediatamente após a confirmação do pagamento você recebe o link de acesso para baixar todos os arquivos.",
  },
  {
    q: "E se eu não gostar do material?",
    a: "A compra é processada em ambiente seguro e você pode entrar em contato com o suporte a qualquer momento para tirar dúvidas sobre o conteúdo antes ou depois de comprar.",
  },
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

function GameSlideshow() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % games.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 1000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full overflow-hidden rounded-2xl border bg-card shadow-lg" style={{ aspectRatio: "1" }}>
        <div
          className="flex h-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {games.map((game) => (
            <div key={game.name} className="relative h-full w-full flex-shrink-0">
              <img
                src={game.src}
                srcSet={`${game.src.replace(/\.webp$/, "-640.webp")} 640w, ${game.src} 1000w`}
                sizes="(min-width: 1024px) 560px, 90vw"
                alt={game.alt}
                loading="lazy"
                decoding="async"
                width={400}
                height={400}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-deep/80 to-transparent px-4 py-3">
                <span className="text-sm font-semibold text-cream">{game.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        {games.map((game, i) => (
          <button
            key={game.name}
            onClick={() => setCurrent(i)}
            aria-label={`Ver ${game.name}`}
            className={`h-2 w-2 rounded-full transition-colors duration-300 ${
              i === current ? "bg-muted-foreground" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function Index() {
  return (
    <main className="bg-background text-foreground">
      {/* NAV */}
      <header className="absolute top-0 left-0 right-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center gap-2 text-cream">
            <Cross className="h-5 w-5 text-gold" />
            <span className="font-display text-base font-semibold sm:text-lg">Jornada da Fé</span>
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
      <section className="relative overflow-hidden bg-deep pb-14 pt-24 text-cream sm:pb-20 sm:pt-28 md:pb-32 md:pt-40">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 20% 0%, oklch(0.45 0.15 75 / 0.45), transparent 50%), radial-gradient(circle at 90% 80%, oklch(0.35 0.12 260 / 0.6), transparent 55%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 sm:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <span className="chip text-[0.7rem] sm:text-sm">
              <Sparkles className="h-3.5 w-3.5 text-gold" /> Material digital cristão para crianças
            </span>
            <h1 className="mt-5 text-3xl font-bold leading-[1.1] sm:mt-6 sm:text-4xl md:text-6xl">
              Jogos Bíblicos para crianças aprenderem sobre{" "}
              <span className="text-gold">Deus</span> longe das telas
            </h1>
            <p className="mt-5 max-w-xl text-base text-cream/80 sm:mt-6 sm:text-lg">
              Um kit divertido e educativo para ensinar histórias, personagens e valores bíblicos em
              casa, na EBD, célula ou ministério infantil. Brincando, a criança aprende — e troca o
              celular por momentos cheios de propósito.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4 sm:mt-9">
              <CTAButton />
              <div className="flex items-center gap-2 text-sm text-cream/70">
                <Download className="h-4 w-4 shrink-0 text-gold" /> Acesso imediato após a compra
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-cream/70 sm:mt-10">
              <div className="flex items-center gap-1.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
                <span className="ml-1 text-cream/80">+1.200 famílias abençoadas</span>
              </div>
              <div className="hidden h-4 w-px bg-white/20 sm:block" />
              <span>8 jogos prontos para imprimir</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-gold/30 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 shadow-2xl">
              <img
                src={heroKids}
                srcSet={`${heroKids700} 700w, ${heroKids} 1000w`}
                sizes="(min-width: 1024px) 620px, 100vw"
                alt="Crianças felizes jogando jogos bíblicos juntos"
                width={1536}
                height={864}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden rounded-2xl bg-cream p-4 text-deep shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-gold/20 p-2">
                  <Gamepad2 className="h-5 w-5 text-deep" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    Kit completo
                  </div>
                  <div className="font-display text-lg font-semibold">8 Jogos Bíblicos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="px-4 py-16 sm:px-6 sm:py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <span className="section-eyebrow">A realidade hoje</span>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl md:text-5xl">
            As crianças estão sendo ensinadas todos os dias. <br className="hidden md:block" />
            <span className="italic text-gold-ink">A pergunta é: por quem?</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground sm:mt-6 sm:text-lg">
            Cada vez mais comum ver crianças passando horas no celular, presas em telas e com pouca
            paciência para o que importa. A infância é o solo onde valores, hábitos e referências
            germinam — o que ela aprende agora pode acompanhá-la por muitos anos.
          </p>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Ensinar sobre Deus, Jesus, amor, obediência, perdão e fé de uma forma leve e divertida
            planta sementes valiosas no coração dela.
          </p>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="bg-secondary/60 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 sm:gap-14 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <img
              src={familyImg}
              srcSet={`${familyImg700} 700w, ${familyImg} 1000w`}
              sizes="(min-width: 1024px) 560px, 100vw"
              alt="Família reunida brincando e aprendendo a Bíblia"
              loading="lazy"
              width={1280}
              height={896}
              className="w-full rounded-2xl shadow-xl sm:rounded-3xl"
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
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl md:text-5xl">
              Uma forma divertida de ensinar a Bíblia sem depender do celular
            </h2>
            <p className="mt-5 text-base text-muted-foreground sm:mt-6 sm:text-lg">
              O Kit de Jogos Bíblicos transforma o aprendizado em brincadeira. Em vez de só falar e
              esperar atenção, você oferece desafios, perguntas e dinâmicas que envolvem a criança
              naturalmente.
            </p>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Ela brinca, participa, interage — e aprende sobre a Palavra de Deus ao mesmo tempo.
            </p>
            <div className="mt-7 sm:mt-8">
              <CTAButton>Quero ensinar brincando</CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="px-4 py-16 sm:px-6 sm:py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 sm:gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="section-eyebrow">O que vem no kit</span>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl md:text-5xl">
                8 jogos bíblicos, prontos para imprimir e brincar
              </h2>
              <p className="mt-5 text-base text-muted-foreground sm:mt-6 sm:text-lg">
                Perguntas, desafios, personagens, atividades visuais e dinâmicas — feitos para
                deixar o aprendizado leve, divertido e participativo.
              </p>
            </div>
            <GameSlideshow />
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-deep px-4 py-16 text-cream sm:px-6 sm:py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <span className="section-eyebrow text-gold">Muito mais que brincadeira</span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl md:text-5xl">
              Cada jogo desenvolve algo valioso na criança
            </h2>
            <p className="mt-5 text-sm text-cream/75 sm:text-base">
              Enquanto muitos conteúdos digitais apenas distraem, esses jogos foram pensados para
              criar momentos com propósito.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-6 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="rounded-xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm transition hover:border-gold/50 sm:rounded-2xl sm:p-6"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/20 sm:h-12 sm:w-12 sm:rounded-xl">
                  <Icon className="h-4.5 w-4.5 text-gold sm:h-6 sm:w-6" />
                </div>
                <p className="mt-3 text-sm font-medium leading-snug sm:mt-4 sm:text-lg">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <span className="section-eyebrow">Ideal para</span>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl md:text-5xl">
            Pensado para quem ensina com amor
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-2 sm:mt-10 sm:gap-3">
            {audiences.map((a) => (
              <span
                key={a}
                className="rounded-full border bg-card px-3.5 py-2 text-xs font-medium text-card-foreground shadow-sm sm:px-5 sm:py-2.5 sm:text-sm"
              >
                {a}
              </span>
            ))}
          </div>
          <p className="mt-8 text-base text-muted-foreground sm:mt-10 sm:text-lg">
            Use em casa, na EBD, em encontros com crianças, brincadeiras em grupo ou atividades
            especiais na igreja.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-secondary/60 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="section-eyebrow">Como funciona</span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl md:text-5xl">
              Simples. Imediato. Sem complicação.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 md:grid-cols-3">
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
              <div key={s.step} className="relative rounded-2xl border bg-card p-5 shadow-sm sm:rounded-3xl sm:p-7">
                <div className="font-display text-4xl text-gold-ink/80 sm:text-5xl">{s.step}</div>
                <s.icon className="absolute right-5 top-5 h-5 w-5 text-deep/40 sm:right-6 sm:top-6 sm:h-6 sm:w-6" />
                <h3 className="mt-2 text-lg font-semibold text-card-foreground sm:text-xl">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground sm:text-base">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-muted-foreground sm:mt-10 sm:text-sm">
            Importante: este é um produto digital. Nenhum item físico será enviado.
          </p>
        </div>
      </section>

      {/* OFFER */}
      <section id="oferta" className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 md:py-32">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, oklch(0.92 0.08 80 / 0.7), transparent 60%)",
          }}
        />
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center sm:mb-12">
            <span className="section-eyebrow">Oferta especial de lançamento</span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl md:text-5xl">
              Escolha o kit ideal para você
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:gap-6">
            {/* Kit Básico */}
            <div className="relative flex min-w-0 flex-col overflow-hidden rounded-xl border-2 border-border bg-card p-3 text-center shadow-xl sm:rounded-2xl sm:p-5 md:rounded-[2rem] md:p-10">
              <span className="section-eyebrow text-[0.6rem] md:text-xs">Kit Básico</span>
              <h3 className="mt-2 text-base font-bold md:mt-3 md:text-2xl">4 Jogos Bíblicos</h3>
              <p className="mt-1 text-[0.65rem] text-muted-foreground md:mt-2 md:text-sm">Ideal para começar</p>

              <div className="mt-1 inline-flex items-center gap-1.5 self-center rounded-full bg-red-500/10 px-2 py-0.5 text-[0.6rem] font-bold text-red-600 md:mt-2 md:px-3 md:py-1 md:text-xs">
                52% OFF hoje
              </div>
              <div className="mt-2 flex items-center justify-center gap-2 md:mt-4">
                <span className="text-xs font-medium text-muted-foreground line-through decoration-red-500/70 md:text-lg">
                  R$30,90
                </span>
              </div>
              <div className="mt-1 md:mt-2">
                <span className="font-display text-xl font-bold text-deep sm:text-2xl md:text-6xl">
                  R$14,90
                </span>
              </div>
              <p className="mt-1 text-[0.6rem] text-muted-foreground md:mt-2 md:text-sm">pagamento único</p>

              <ul className="mx-auto mt-3 space-y-1.5 text-left md:mt-6 md:max-w-xs md:space-y-2.5">
                {[
                  "4 jogos prontos para imprimir",
                  "Acesso imediato após a compra",
                  "Ideal para uso em casa ou na EBD",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-1.5 md:gap-2.5">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold/30 md:h-5 md:w-5">
                      <Check className="h-2.5 w-2.5 text-deep md:h-3.5 md:w-3.5" />
                    </div>
                    <span className="text-[0.65rem] leading-tight text-card-foreground md:text-sm">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col items-center gap-2 pt-4 md:gap-3 md:pt-8">
                <a
                  href="https://go.perfectpay.com.br/PPU38CQDFEA"
                  rel="noopener noreferrer"
                  className="btn-cta w-full justify-center !px-3 !py-2.5 !text-xs md:!px-8 md:!py-4 md:!text-base"
                >
                  Quero esse
                  <ArrowRight className="h-3.5 w-3.5 md:h-5 md:w-5" />
                </a>
                <div className="flex items-center gap-1 text-[0.6rem] text-muted-foreground md:gap-2 md:text-xs">
                  <ShieldCheck className="h-3 w-3 text-gold md:h-4 md:w-4" /> Compra segura
                </div>
              </div>
            </div>

            {/* Kit Completo */}
            <div className="relative flex min-w-0 flex-col overflow-hidden rounded-xl border-2 border-gold/40 bg-card p-3 text-center shadow-2xl sm:rounded-2xl sm:p-5 md:rounded-[2rem] md:p-10">
              <div
                aria-hidden
                className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-gold/30 blur-3xl"
              />
              <div className="mb-1.5 inline-block rounded-full bg-gold/20 px-2 py-0.5 text-[0.6rem] font-bold text-deep md:mb-3 md:px-3 md:py-1 md:text-xs">
                Mais popular
              </div>
              <span className="block section-eyebrow text-[0.6rem] md:text-xs">Kit Completo</span>
              <h3 className="mt-2 text-base font-bold md:mt-3 md:text-2xl">8 Jogos Bíblicos</h3>
              <p className="mt-1 text-[0.65rem] text-muted-foreground md:mt-2 md:text-sm">O pacote completo</p>

              <div className="mt-1 inline-flex items-center gap-1.5 self-center rounded-full bg-red-500/10 px-2 py-0.5 text-[0.6rem] font-bold text-red-600 md:mt-2 md:px-3 md:py-1 md:text-xs">
                44% OFF hoje
              </div>
              <div className="mt-2 flex items-center justify-center gap-2 md:mt-4">
                <span className="text-xs font-medium text-muted-foreground line-through decoration-red-500/70 md:text-lg">
                  R$35,90
                </span>
              </div>
              <div className="mt-1 md:mt-2">
                <span className="font-display text-xl font-bold text-deep sm:text-2xl md:text-6xl">
                  R$19,90
                </span>
              </div>
              <p className="mt-1 text-[0.6rem] text-muted-foreground md:mt-2 md:text-sm">pagamento único</p>

              <ul className="mx-auto mt-3 space-y-1.5 text-left md:mt-6 md:max-w-xs md:space-y-2.5">
                {[
                  "8 jogos prontos para imprimir",
                  "Acesso imediato após a compra",
                  "Ideal para casa, EBD ou ministério",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-1.5 md:gap-2.5">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold/30 md:h-5 md:w-5">
                      <Check className="h-2.5 w-2.5 text-deep md:h-3.5 md:w-3.5" />
                    </div>
                    <span className="text-[0.65rem] leading-tight text-card-foreground md:text-sm">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col items-center gap-2 pt-4 md:gap-3 md:pt-8">
                <a
                  href="https://go.perfectpay.com.br/PPU38CQDI55"
                  rel="noopener noreferrer"
                  className="btn-cta w-full justify-center !px-3 !py-2.5 !text-xs md:!px-8 md:!py-4 md:!text-base"
                >
                  Quero esse
                  <ArrowRight className="h-3.5 w-3.5 md:h-5 md:w-5" />
                </a>
                <div className="flex items-center gap-1 text-[0.6rem] text-muted-foreground md:gap-2 md:text-xs">
                  <ShieldCheck className="h-3 w-3 text-gold md:h-4 md:w-4" /> Compra segura
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-deep px-4 py-16 text-cream sm:px-6 sm:py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Cross className="mx-auto h-8 w-8 text-gold" />
          <h2 className="mt-6 text-2xl font-bold sm:text-3xl md:text-5xl">
            Dê às crianças uma alternativa melhor do que apenas telas
          </h2>
          <p className="mt-5 text-base text-cream/75 sm:mt-6 sm:text-lg">
            A infância passa rápido. Cada momento pode ser uma oportunidade de ensinar algo bom,
            criar memórias e aproximar as crianças da Palavra de Deus.
          </p>
          <div className="mt-8 sm:mt-10">
            <CTAButton>Sim, quero receber os Jogos Bíblicos</CTAButton>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="section-eyebrow">Dúvidas frequentes</span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl md:text-5xl">
              Ainda tem alguma dúvida?
            </h2>
          </div>
          <Suspense fallback={<div className="mt-10 sm:mt-14" />}>
            <FaqAccordion faqs={faqs} />
          </Suspense>
        </div>
      </section>

      {/* TRUST SIGNALS */}
      <section className="bg-secondary/60 px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 sm:grid-cols-3 sm:gap-6">
            {trustSignals.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="group relative flex flex-col items-center gap-3 rounded-2xl border bg-card p-6 text-center shadow-lg shadow-black/5 transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:rounded-3xl sm:p-8"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/15 sm:h-14 sm:w-14">
                  <Icon className="h-5 w-5 text-gold-ink sm:h-6 sm:w-6" />
                </div>
                <p className="font-display text-base font-semibold text-card-foreground sm:text-lg">
                  {title}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 bg-deep px-4 py-8 text-center text-sm text-cream/50 sm:px-6 sm:py-10">
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
