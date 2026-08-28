import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import heroKids from "@/assets/hero-kids.webp";
import heroKids700 from "@/assets/hero-kids-700.webp";
import heroKids820 from "@/assets/hero-kids-820.webp";
import {
  BookOpen,
  Check,
  Clock,
  Gamepad2,
  Gift,
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
  Mail,
  Printer,
  Flame,
  Zap,
} from "lucide-react";

const FaqAccordion = lazy(() => import("@/components/FaqAccordion"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kit de Jogos Bíblicos: seu filho aprende a Bíblia brincando" },
      {
        name: "description",
        content:
          "Um kit digital com 20 jogos bíblicos prontos para imprimir, feito para a mãe cristã transformar alguns minutos da rotina em uma brincadeira que ensina a Palavra, reduz tela e cria conexão com o filho — sem virar aula. Acesso imediato a partir de R$17,90.",
      },
      {
        property: "og:title",
        content: "Faça seu filho aprender a Bíblia brincando — e querer jogar de novo",
      },
      {
        property: "og:description",
        content:
          "20 jogos bíblicos prontos para imprimir. A criança se diverte e aprende sobre Deus, longe das telas e perto de você. Acesso imediato, pagamento único, garantia de 7 dias.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "" },
    ],
  }),
  component: Index,
});

// ---------------------------------------------------------------------------
// Dados da página. Persona única: a mãe cristã. Sem linguagem de EBD / igreja /
// professora / ministério — toda a copy fala com "seu filho", "em casa", "com
// você" (ver plano LP-MAE-V1.0, seção 2).
// ---------------------------------------------------------------------------

// Tipos de jogos que vêm no kit — selos compactos e sem imagem usados nos
// cards de oferta (texto puro, custo zero de carregamento).
const baseKinds = ["Uno & Cartas", "Quiz Bíblico", "Caça-palavras", "Mímica", "Tabuleiro"];
const fullKinds = [...baseKinds, "Super Trunfo", "Encontre"];

// Benefícios essenciais (plano, seção 5) — ícone simples + frase curta. Seis no
// total, leves no mobile (grade 2 colunas).
const benefits = [
  { icon: BookOpen, text: "Conhecimento bíblico de forma leve" },
  { icon: Tv, text: "Menos minutos de tela" },
  { icon: Sparkles, text: "Mais atenção, memória e raciocínio" },
  { icon: Cross, text: "Valores cristãos presentes na rotina" },
  { icon: Heart, text: "Interação real entre mãe e filho" },
  { icon: Clock, text: "Uma atividade pronta quando você precisa" },
];

const faqs = [
  {
    q: "O material é físico ou digital?",
    a: "É 100% digital. Nenhum item físico é enviado pelo correio. Após a compra você recebe os arquivos na hora e pode imprimir quantas vezes quiser, em casa ou em uma gráfica.",
  },
  {
    q: "Preciso de impressora para usar?",
    a: "Para jogar no papel, sim — você imprime em casa ou em uma gráfica próxima. Alguns jogos também podem ser abertos direto na tela do celular, tablet ou computador para brincar com seu filho.",
  },
  {
    q: "Preciso de papel especial ou plastificar?",
    a: "Não é obrigatório. Papel comum já funciona bem. Se quiser mais durabilidade para usar várias vezes, você pode imprimir em papel mais grosso ou plastificar — mas isso é totalmente opcional.",
  },
  {
    q: "Para qual idade os jogos são indicados?",
    a: "Foram pensados para crianças em fase de alfabetização até a pré-adolescência, e funcionam bem também em brincadeiras com irmãos de idades diferentes.",
  },
  {
    q: "Posso imprimir novamente depois?",
    a: "Pode. O material fica com você: sempre que quiser, é só abrir o arquivo e imprimir de novo para uso pessoal com seu filho.",
  },
  {
    q: "Qual a diferença entre o Kit Básico e o Kit Completo?",
    a: "O Kit Básico traz 10 jogos, ideal para começar. O Kit Completo traz todos os 20 jogos e mais variedade de dinâmicas — é a opção mais escolhida por quem quer ter sempre uma brincadeira nova à mão em casa.",
  },
  {
    q: "O pagamento é único ou tem mensalidade?",
    a: "É um pagamento único. Você paga uma vez e tem acesso permanente aos jogos, sem cobranças recorrentes.",
  },
  {
    q: "Em quanto tempo recebo o acesso?",
    a: "Imediatamente após a confirmação do pagamento você recebe o link para baixar todos os arquivos.",
  },
  {
    q: "E se eu não gostar do material?",
    a: "Você tem a garantia de 7 dias. Se o material não fizer sentido para a sua família, é só falar com o suporte dentro do prazo que devolvemos 100% do valor.",
  },
];

// Os 20 jogos do kit, na mesma ordem das artes do produto. Os BASIC_GAME_COUNT
// primeiros compõem o Kit Básico; todos os 20, o Kit Completo. Lista em texto
// puro (sem imagens) para manter o carregamento leve.
const kitGames = [
  "(Casais) Quem Sou Eu?",
  "3 Pistas",
  "Alfabeto de Versículos",
  "Biblicamente",
  "Bingo de Jesus",
  "Bônus",
  "Dominó",
  "Jogo da Memória",
  "Mico Bíblico",
  "Passatempo",
  "Que Livro é Esse?",
  "Quem Sou Eu?",
  "Quiz Bíblico",
  "Siga a Cristo",
  "Spot It",
  "Tá na Bíblia ou Tá Amarrado?",
  "Tabuleiro (Plano de Salvação)",
  "Trunfo Bíblico",
  "Uno da Fé",
  "Verdade ou Mentira",
];
const BASIC_GAME_COUNT = 10;

// Constrói o srcSet responsivo de uma imagem de /images seguindo o padrão de
// variantes do projeto: "<nome>-640.webp" e "<nome>-700.webp" + o arquivo base
// (maior). Centraliza a regra usada na galeria e nos destaques de jogos.
function srcSetFor(src: string) {
  const b640 = src.replace(/\.webp$/, "-640.webp");
  const b700 = src.replace(/\.webp$/, "-700.webp");
  return `${b640} 640w, ${b700} 700w, ${src} 820w`;
}

// Fotos reais do produto impresso/em uso — a prova visual da seção 2 e da seção
// de confiança. São imagens reais do cliente (plano: "não substituir por fotos
// genéricas de banco de imagens").
const realProducts = [
  {
    src: "/images/real-uno-mesa.webp",
    alt: "Uno da Fé impresso sobre a mesa, pronto para jogar em família",
  },
  {
    src: "/images/imprimindo-uno-biblico.webp",
    alt: "Cartas do Uno bíblico saindo da impressora de casa",
  },
  {
    src: "/images/real-siga-cristo-mesa.webp",
    alt: "Tabuleiro Siga a Cristo impresso e montado sobre a mesa",
  },
  {
    src: "/images/real-super-trunfo.webp",
    alt: "Cartas do Super Trunfo bíblico impressas, com a carta de Marcos 10.45 em destaque",
  },
  {
    src: "/images/real-quiz-biblico.webp",
    alt: "Cartas do Quiz Bíblico impressas e organizadas ao lado da caixinha do jogo",
  },
];

// Smoothly slides the page to the offer section and keeps a sliding shine on the
// clicked button until the scroll settles.
//
// We roll our own rAF tween instead of native `scrollIntoView({ behavior:
// "smooth" })` because the native version locks onto a single target pixel at
// click time. On slower devices, images above the fold finish loading mid-scroll
// and shift the layout, so that pixel becomes stale and the page overshoots the
// price cards. This tween re-reads the target's live position every frame, so it
// always settles exactly at the top of the offer section no matter how the
// layout shifts during the animation.
function slideToOffer(e: React.MouseEvent<HTMLAnchorElement>) {
  const target = document.getElementById("oferta");
  if (!target) return; // fall back to the default anchor jump
  e.preventDefault();

  const btn = e.currentTarget;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cleanup = () => btn.classList.remove("is-navigating");

  btn.classList.add("is-navigating");

  // Absolute Y so the target sits at the very top of the viewport, clamped so we
  // never ask to scroll past the bottom of the page.
  const destination = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return Math.min(window.scrollY + target.getBoundingClientRect().top, Math.max(max, 0));
  };

  if (reduce) {
    window.scrollTo(0, destination());
    cleanup();
    return;
  }

  const startY = window.scrollY;
  const startTime = performance.now();

  // Ease-in-out (gentle start, gentle stop) with a distance-aware duration so
  // both short and full-page slides feel equally smooth — never a jarring dash.
  const distance = Math.abs(destination() - startY);
  const duration = Math.min(1000, Math.max(650, distance * 0.22));
  const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const step = (now: number) => {
    const t = Math.min(1, (now - startTime) / duration);
    // Recompute the destination each frame so a mid-scroll layout shift can't
    // make us overshoot or stop short.
    const y = startY + (destination() - startY) * easeInOutCubic(t);
    window.scrollTo(0, y);
    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      window.scrollTo(0, destination()); // snap to the exact final position
      cleanup();
    }
  };

  requestAnimationFrame(step);
}

// CTA guarda-chuva: rola até a oferta (#oferta). Não é um botão de checkout — os
// botões que levam ao PerfectPay ficam só nos cards de oferta, para não
// interferir na mensuração de InitiateCheckout (disparada do lado do checkout).
function CTAButton({ children = "Quero conhecer os jogos" }: { children?: React.ReactNode }) {
  return (
    <a href="#oferta" onClick={slideToOffer} className="btn-cta nav-cta">
      {children}
      <ArrowRight className="h-5 w-5" />
    </a>
  );
}

// Badge discreto e monocromático de forma de pagamento — wordmark leve, sem
// imagem externa (zero requisição de rede).
function PayBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-7 items-center rounded-md border border-[#E7D9B4] bg-white px-2.5 text-[0.7rem] font-semibold tracking-wide text-deep/80 shadow-sm sm:h-8 sm:text-xs">
      {children}
    </span>
  );
}

// Contador da oferta de lançamento. Reinicia em 1h23m a cada visita (sem
// persistência) — um único setInterval de 1s e nenhuma biblioteca, custo mínimo.
// O estado inicial é o mesmo no servidor e no cliente (01:23:00), então não há
// mismatch de hidratação; o relógio só começa a andar depois que monta.
const COUNTDOWN_START = 1 * 3600 + 23 * 60;

function OfferCountdown() {
  const [left, setLeft] = useState(COUNTDOWN_START);

  useEffect(() => {
    const id = setInterval(() => setLeft((s) => (s <= 0 ? 0 : s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const hh = pad(Math.floor(left / 3600));
  const mm = pad(Math.floor((left % 3600) / 60));
  const ss = pad(left % 60);
  const box =
    "rounded-lg bg-deep px-2 py-1.5 text-sm font-bold tabular-nums text-cream md:px-2.5 md:text-lg";
  const colon = "text-sm font-bold text-deep/60 md:text-lg";

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-wide text-red-700 md:text-xs">
        <Clock className="h-3.5 w-3.5" /> A oferta de lançamento acaba em
      </div>
      <div
        className="mt-1.5 flex items-center gap-1 font-display"
        role="timer"
        aria-live="off"
        aria-label={`Oferta acaba em ${hh}:${mm}:${ss}`}
      >
        <span className={box}>{hh}</span>
        <span className={colon}>:</span>
        <span className={box}>{mm}</span>
        <span className={colon}>:</span>
        <span className={box}>{ss}</span>
      </div>
    </div>
  );
}

// Runs an auto-advance interval only while the carousel is on screen, so it
// never re-renders (or wastes CPU) behind the fold — freeing the main thread
// during the initial hero paint and saving battery when scrolled past.
function useAutoRotate<T extends HTMLElement>(length: number, delayMs: number) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = undefined;
      }
    };
    const start = () => {
      if (!timer) timer = setInterval(() => setCurrent((prev) => (prev + 1) % length), delayMs);
    };
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), {
      threshold: 0.2,
    });
    io.observe(el);
    return () => {
      stop();
      io.disconnect();
    };
  }, [length, delayMs]);

  return { current, setCurrent, ref };
}

// Faixa promocional fixa no topo — marquee com os gatilhos da oferta deslizando
// em loop contínuo. Reflete a oferta real dos cards (60% OFF de lançamento, Kit
// Completo R$27,90, bônus grátis, pagamento único vitalício, garantia de 7 dias).
const PROMO_ITEMS = [
  { icon: Flame, text: "Oferta de lançamento: 60% OFF" },
  { icon: Sparkles, text: "Kit Completo por R$27,90 — de R$69,90" },
  { icon: Gift, text: "Bônus grátis incluso na sua compra" },
  { icon: Zap, text: "Acesso imediato · pagamento único · para sempre" },
  { icon: ShieldCheck, text: "Garantia de 7 dias, sem risco" },
];

function PromoBar() {
  // Duplicamos a lista para o loop ser contínuo: a track tem 2x a largura do
  // conteúdo e a animação corre de translateX(-50%) até 0 (movimento p/ direita).
  const items = [...PROMO_ITEMS, ...PROMO_ITEMS];
  return (
    <div
      className="promo-bar sticky top-0 z-50 overflow-hidden border-b border-gold/40 text-deep shadow-sm"
      style={{ background: "linear-gradient(135deg, oklch(0.85 0.13 82), oklch(0.76 0.15 75))" }}
    >
      <div className="promo-track flex w-max items-center py-2">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-2 whitespace-nowrap px-5 text-[0.7rem] font-bold uppercase tracking-wide sm:px-7 sm:text-sm"
          >
            <item.icon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}

// Item de checklist reutilizável (marca dourada + texto). Usado nas seções de
// identificação, mecanismo e no hero.
function CheckItem({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  const ring =
    tone === "light"
      ? "bg-gold/20 ring-gold/40 text-gold"
      : "bg-gold/20 ring-gold/30 text-gold-ink";
  const text = tone === "light" ? "text-cream/90" : "text-card-foreground";
  return (
    <li className="flex items-start gap-3">
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ring-1 ${ring}`}
      >
        <Check className="h-3.5 w-3.5" />
      </span>
      <span className={`text-base sm:text-lg ${text}`}>{children}</span>
    </li>
  );
}

// CTA fixo no rodapé apenas no mobile. Rola para a oferta (#oferta) — como há
// dois kits, ele leva à seção de escolha, não a um checkout específico (plano
// seção 8). Some quando a própria oferta está visível para não cobrir os cards
// nem o botão do navegador (respeita a safe-area inferior).
function StickyMobileCTA() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const target = document.getElementById("oferta");
    if (!target) return;
    const io = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-gold/30 bg-cream/95 px-4 py-3 backdrop-blur-md transition-transform duration-300 sm:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <a
        href="#oferta"
        onClick={slideToOffer}
        className="btn-cta nav-cta w-full justify-center !py-3"
      >
        Ver os kits — a partir de R$17,90
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

function Index() {
  return (
    <main className="bg-background text-foreground">
      {/* 0 — BARRA SUPERIOR (valor + oferta) */}
      <PromoBar />

      {/* 1 — HERO GUARDA-CHUVA: promessa ampla + produto + CTA + trust bar */}
      <section className="relative overflow-hidden bg-deep pb-14 pt-24 text-cream sm:pb-20 sm:pt-28 md:pb-28 md:pt-36">
        {/* NAV (sobreposto ao hero, abaixo da faixa promocional) */}
        <header className="absolute top-0 left-0 right-0 z-20">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex items-center gap-2 text-cream">
              <Cross className="h-5 w-5 text-gold" />
              <span className="font-display text-base font-semibold sm:text-lg">
                Achadinhos Bíblicos
              </span>
            </div>
            <a
              href="#oferta"
              onClick={slideToOffer}
              className="nav-cta hidden rounded-full border border-white/20 px-4 py-2 text-sm text-cream backdrop-blur-md hover:bg-white/10 sm:inline-flex"
            >
              Ver os kits
            </a>
          </div>
        </header>

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
              <Sparkles className="h-3.5 w-3.5 text-gold" /> Para mães cristãs que ensinam a fé no
              dia a dia
            </span>
            <h1 className="mt-5 font-display text-[2rem] font-bold leading-[1.12] tracking-tight sm:mt-6 sm:text-[2.6rem] md:text-[3.1rem]">
              <span
                className="block text-cream"
                style={{ textShadow: "0 0 16px rgba(255, 248, 230, 0.22)" }}
              >
                Faça seu filho aprender a Bíblia brincando
              </span>
              <span
                className="mt-1 block text-gold"
                style={{
                  textShadow: "0 0 1px rgba(255, 224, 158, 0.5), 0 0 20px rgba(230, 170, 60, 0.4)",
                }}
              >
                — e querer jogar de novo.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-cream/80 sm:mt-7 sm:text-lg">
              Um kit digital com{" "}
              <span className="font-semibold text-cream">
                20 jogos bíblicos prontos para imprimir
              </span>
              , feito para transformar alguns minutos longe das telas em momentos leves de fé,
              diversão e conexão com você.
            </p>
            <ul className="mt-6 space-y-2.5 sm:mt-7">
              {[
                "20 jogos prontos para imprimir",
                "Acesso imediato após a compra",
                "Pagamento único e acesso para sempre",
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-2.5 text-sm text-cream/85 sm:text-base"
                >
                  <Check className="h-4 w-4 shrink-0 text-gold" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-col items-start gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-4">
              <CTAButton />
              <div className="flex items-center gap-2 text-sm text-cream/70">
                <ShieldCheck className="h-4 w-4 shrink-0 text-gold" /> Garantia de 7 dias · 100%
                digital
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-cream/70 sm:mt-10">
              <div className="flex items-center gap-1.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
                <span className="ml-1 text-cream/80">+1.200 famílias abençoadas</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[2rem]"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 25%, oklch(0.76 0.14 78 / 0.3), transparent 70%)",
              }}
            />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 shadow-2xl">
              <img
                src={heroKids}
                srcSet={`${heroKids700} 700w, ${heroKids820} 820w, ${heroKids} 1000w`}
                sizes="(min-width: 1024px) 620px, 100vw"
                alt="Mãe e filhos felizes jogando jogos bíblicos juntos sobre a mesa"
                width={1536}
                height={864}
                fetchPriority="high"
                decoding="sync"
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
                  <div className="font-display text-lg font-semibold">20 Jogos Bíblicos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — PROVA VISUAL IMEDIATA: o que a mãe recebe e como fica impresso */}
      <section className="bg-secondary/60 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">Veja o produto de verdade</span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl md:text-4xl">
              Não é mais uma atividade esquecida no celular
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Você recebe os arquivos e pode colocar a brincadeira na mesa ainda hoje. Estas são
              fotos reais do material impresso — do jeitinho que ele chega até o seu filho.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-2.5 sm:mt-12 sm:gap-4 lg:grid-cols-3">
            {realProducts.map((p, i) => (
              <div
                key={p.src}
                className={`overflow-hidden rounded-2xl border bg-card shadow-md sm:rounded-3xl ${
                  i === 0 ? "col-span-2 lg:col-span-1 lg:row-span-2" : ""
                }`}
              >
                <img
                  src={p.src}
                  srcSet={srcSetFor(p.src)}
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
                  alt={p.alt}
                  loading="lazy"
                  decoding="async"
                  width={820}
                  height={820}
                  className={`w-full object-cover ${i === 0 ? "h-full lg:aspect-auto" : ""}`}
                  style={i === 0 ? undefined : { aspectRatio: "1" }}
                />
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-4 text-center sm:mt-10">
            <p className="inline-flex items-center gap-2 text-sm text-muted-foreground sm:text-base">
              <Printer className="h-4 w-4 text-gold-ink" /> Arquivo → impressora → mesa. Simples
              assim.
            </p>
            <CTAButton>Quero conhecer os jogos</CTAButton>
          </div>
        </div>
      </section>

      {/* 3 — IDENTIFICAÇÃO: a rotina real de uma mãe (tela, cansaço, falta de tempo) */}
      <section className="bg-deep px-4 py-16 text-cream sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="section-eyebrow text-gold">A rotina real de uma mãe</span>
            <h2 className="mx-auto mt-4 max-w-2xl text-2xl font-bold sm:text-3xl md:text-4xl">
              Você quer ensinar mais sobre Deus. O difícil é fazer isso caber no dia a dia.
            </h2>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-cream/80 sm:text-lg">
            Entre trabalho, casa, cansaço e uma tela que prende a atenção em segundos, transformar o
            momento da Bíblia em algo que a criança queira participar nem sempre é simples.
          </p>
          <ul className="mx-auto mt-8 grid max-w-2xl gap-3 sm:mt-10">
            {[
              "Você não quer transformar a fé em cobrança.",
              "Não quer passar horas preparando atividade.",
              "E também não quer que toda alternativa ao celular vire uma briga.",
            ].map((t) => (
              <CheckItem key={t} tone="light">
                {t}
              </CheckItem>
            ))}
          </ul>

          {/* Beat emocional (legado + "a infância passa"): reposicionado abaixo da
              hero, como manda o plano — sem monopolizar o primeiro scroll. */}
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-gold/25 bg-white/[0.04] p-6 text-center backdrop-blur-sm sm:mt-12 sm:p-8">
            <p className="text-base leading-relaxed text-cream/85 sm:text-lg">
              A infância passa rápido — e a fé que fica é plantada{" "}
              <span className="font-semibold text-cream">agora</span>, nos pequenos momentos do dia
              a dia.
            </p>
            <p className="mt-4 font-display text-lg font-semibold text-gold sm:text-xl">
              Foi exatamente por isso que os jogos foram criados.
            </p>
          </div>
        </div>
      </section>

      {/* 4 — MECANISMO: ensinar brincando */}
      <section className="bg-secondary/60 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 sm:gap-14 lg:grid-cols-2 lg:items-center">
          <div className="relative order-2 lg:order-1">
            <RealProductSlideshow />
          </div>
          <div className="order-1 lg:order-2">
            <span className="section-eyebrow">A solução</span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl md:text-4xl">
              A Bíblia não precisa virar aula para{" "}
              <span className="text-gold-ink">fazer parte da infância</span>
            </h2>
            <p className="mt-5 text-base text-card-foreground sm:text-lg">
              Quando a criança entra pela brincadeira, a atenção vem primeiro. Enquanto joga, ela
              encontra personagens, histórias, perguntas e valores bíblicos de um jeito natural — e
              o aprendizado acontece no meio de um momento que ela realmente quer repetir.
            </p>
            <ul className="mt-6 space-y-3 sm:mt-7">
              {[
                "Ela brinca sem sentir que está “estudando”.",
                "Você participa sem precisar preparar uma aula.",
                "A repetição do jogo cria novas conversas sobre a fé.",
              ].map((t) => (
                <CheckItem key={t}>{t}</CheckItem>
              ))}
            </ul>
            <div className="mt-8">
              <CTAButton>Quero ensinar brincando</CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* 5 — BENEFÍCIOS ESSENCIAIS */}
      <section className="bg-deep px-4 py-16 text-cream sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow text-gold">Muito mais que brincadeira</span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl md:text-4xl">
              Alguns minutos de brincadeira. Muito mais acontecendo ao mesmo tempo.
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-6 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition hover:border-gold/50 sm:p-6"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/20 sm:h-11 sm:w-11 sm:rounded-xl">
                  <Icon className="h-4.5 w-4.5 text-gold sm:h-5 sm:w-5" />
                </div>
                <p className="text-sm font-medium leading-snug sm:text-base">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — COMO FUNCIONA: recebe → imprime → joga */}
      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="section-eyebrow">Como funciona</span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl md:text-4xl">
              Simples. Imediato. Sem complicação.
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Da compra para a mesa em 3 passos.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-6">
            {[
              {
                step: "01",
                title: "Receba o acesso",
                desc: "O material digital chega logo após a confirmação do pagamento.",
                icon: Download,
              },
              {
                step: "02",
                title: "Escolha e imprima",
                desc: "Abra o jogo que quiser usar e prepare as peças necessárias.",
                icon: Printer,
              },
              {
                step: "03",
                title: "Sente e jogue",
                desc: "Sem aula pronta, sem roteiro complicado — só você e seu filho.",
                icon: Gamepad2,
              },
            ].map((s) => (
              <div key={s.step} className="relative rounded-3xl border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-display text-4xl text-gold-ink/70 sm:text-5xl">
                    {s.step}
                  </span>
                  <s.icon className="h-6 w-6 text-deep/40" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-card-foreground sm:text-xl">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground sm:text-base">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground sm:mt-10">
            Produto digital. Nenhum item físico será enviado.
          </p>
        </div>
      </section>

      {/* 7 — CONTEÚDO DO KIT: 20 jogos, com destaque visual + lista completa */}
      <section className="bg-deep px-4 py-16 text-cream sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow text-gold">Conteúdo do kit</span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl md:text-4xl">
              20 formas diferentes de aprender brincando
            </h2>
            <p className="mt-4 text-base text-cream/75 sm:text-lg">
              Para não faltar ideia quando você quiser tirar a tela e colocar algo com propósito no
              lugar.
            </p>
          </div>

          {/* Legenda: quais jogos entram em cada kit */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-cream/80 sm:text-sm">
            <span className="inline-flex items-center gap-2">
              <span className="h-3.5 w-3.5 shrink-0 rounded-full bg-gold" aria-hidden />
              Já no Kit Básico <span className="text-cream/55">(10 jogos)</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span
                className="h-3.5 w-3.5 shrink-0 rounded-full bg-white/20 ring-1 ring-white/30"
                aria-hidden
              />
              Só no Kit Completo <span className="text-cream/55">(todos os 20)</span>
            </span>
          </div>

          {/* Lista completa dos 20 jogos */}
          <ul className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {kitGames.map((name, i) => {
              const n = i + 1;
              const inBasic = n <= BASIC_GAME_COUNT;
              return (
                <li
                  key={name}
                  className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-sm transition hover:border-gold/40 sm:gap-3 sm:rounded-2xl sm:p-3.5"
                >
                  <span
                    className={
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.7rem] font-bold sm:h-7 sm:w-7 sm:text-xs " +
                      (inBasic
                        ? "bg-gold text-deep"
                        : "bg-white/15 text-cream ring-1 ring-white/25")
                    }
                  >
                    {n}
                  </span>
                  <span className="text-left text-xs font-medium leading-tight text-cream sm:text-sm">
                    {name}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-cream/70 sm:text-base">
              Um acervo que fica com você para acessar e imprimir novamente quando quiser.
            </p>
            <CTAButton>Quero receber o kit</CTAButton>
          </div>
        </div>
      </section>

      {/* 8 — PROVA / CONFIANÇA: prova de produto (sem depoimentos inventados) */}
      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">O que realmente importa</span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl md:text-4xl">
              O melhor sinal não é a criança terminar. É ela querer repetir.
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Material real, impresso em casa e usado na mesa. Variedade de jogos para a brincadeira
              não cansar — e a fé continuar presente na rotina.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Printer,
                title: "Impressão em casa",
                desc: "Papel comum já funciona. Imprima quantas vezes quiser.",
              },
              {
                icon: Gamepad2,
                title: "Variedade real",
                desc: "20 dinâmicas diferentes para não repetir sempre o mesmo jogo.",
              },
              {
                icon: Users,
                title: "Momento em família",
                desc: "Feito para jogar junto, não só para ocupar a criança.",
              },
              {
                icon: RotateCcw,
                title: "Pra jogar de novo",
                desc: "A criança pede para repetir — e a Palavra volta com ela.",
              },
            ].map((c) => (
              <div key={c.title} className="rounded-3xl border bg-card p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 ring-1 ring-gold/25">
                  <c.icon className="h-6 w-6 text-gold-ink" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-card-foreground">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground sm:mt-10">
            <div className="flex items-center gap-1 text-gold-ink">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span>+1.200 famílias já levaram os jogos para casa</span>
          </div>
        </div>
      </section>

      {/* 9 — OFERTA: Kit Básico + Kit Completo (Completo dominante) */}
      <section id="oferta" className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, oklch(0.92 0.08 80 / 0.7), transparent 60%)",
          }}
        />
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 text-center sm:mb-8">
            <span className="section-eyebrow">Escolha o kit</span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl md:text-4xl">
              Comece hoje com uma atividade pronta para fazer com seu filho
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              Pagamento único, acesso para sempre. Garanta o preço de lançamento antes que ele volte
              ao valor normal.
            </p>
          </div>

          {/* Contador único de lançamento acima dos cards — mantém a urgência sem
              poluir os dois cards com relógios repetidos. */}
          <div className="mx-auto mb-8 w-full max-w-sm rounded-2xl border border-gold/30 bg-card/80 px-5 py-4 shadow-sm backdrop-blur-sm sm:mb-10">
            <OfferCountdown />
          </div>

          {/* Mobile: empilhados com o Kit Completo em cima (dominante). Desktop:
              Básico à esquerda, Completo à direita e em destaque. */}
          <div className="grid gap-5 md:grid-cols-2 md:items-stretch md:gap-6">
            {/* Kit Completo (principal / recomendado) — md:order-2 */}
            <div className="relative order-1 flex flex-col overflow-hidden rounded-[1.75rem] border-2 border-gold/50 bg-card p-6 text-center shadow-2xl md:order-2 md:p-9">
              <div
                aria-hidden
                className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-gold/30 blur-3xl"
              />
              <div className="relative">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-deep shadow-sm">
                  <Star className="h-3.5 w-3.5 fill-current" /> Recomendado
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-deep">Kit Completo</h3>
                <p className="mt-1 text-sm text-muted-foreground">20 jogos — a coleção completa</p>

                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-3 py-1 text-xs font-bold text-red-700">
                  <Flame className="h-3.5 w-3.5" /> 60% OFF de lançamento
                </div>
                <div className="mt-3 flex items-end justify-center gap-2">
                  <span className="text-lg font-medium text-muted-foreground line-through decoration-red-500/70">
                    R$69,90
                  </span>
                  <span className="font-display text-5xl font-bold text-deep md:text-6xl">
                    R$27,90
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  pagamento único · acesso para sempre
                </p>

                <p className="mt-6 text-xs font-bold uppercase tracking-wide text-gold-ink">
                  Todos os tipos de jogos
                </p>
                <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                  {fullKinds.map((k) => (
                    <span
                      key={k}
                      className="rounded-full bg-gold/15 px-2.5 py-1 text-xs font-medium text-gold-ink ring-1 ring-gold/30"
                    >
                      {k}
                    </span>
                  ))}
                </div>

                {/* Bônus grátis exclusivo do Kit Completo */}
                <div className="mt-5 rounded-xl border border-dashed border-gold/50 bg-gold/10 p-3">
                  <div className="flex items-center justify-center gap-1.5 pb-1.5 text-[0.7rem] font-bold uppercase tracking-wide text-gold-ink">
                    <Gift className="h-4 w-4" /> Bônus grátis incluso
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-card px-3 py-2 shadow-sm ring-1 ring-gold/15">
                    <BookOpen className="h-4 w-4 shrink-0 text-gold-ink" />
                    <span className="text-left text-sm font-semibold leading-tight text-card-foreground">
                      +100 Versículos organizados por temas
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative mt-auto flex flex-col items-center gap-3 pt-6">
                <a
                  href="https://go.perfectpay.com.br/PPU38CQELK5"
                  rel="noopener noreferrer"
                  className="btn-cta btn-pulse w-full justify-center"
                >
                  Quero o Kit Completo
                  <ArrowRight className="h-5 w-5" />
                </a>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-gold" /> Compra segura · garantia de 7 dias
                </div>
              </div>
            </div>

            {/* Kit Básico — mesmo template do Kit Completo para ficar simétrico
                (mesmo tamanho, fontes, selos e botão). Difere só no conteúdo real:
                10 jogos, preço e sem bônus. O selo "Recomendado" e a caixa de bônus
                entram como espaçadores invisíveis para alinhar linha a linha com o
                Completo — md:order-1 */}
            <div className="relative order-2 flex flex-col overflow-hidden rounded-[1.75rem] border-2 border-gold/50 bg-card p-6 text-center shadow-2xl md:order-1 md:p-9">
              <div
                aria-hidden
                className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-gold/30 blur-3xl"
              />
              <div className="relative">
                {/* Espaçador invisível do selo "Recomendado" (só o Completo exibe).
                    Só ocupa espaço no desktop, onde os cards ficam lado a lado e
                    precisam alinhar linha a linha; no mobile empilhado é removido
                    para não deixar vão vazio. */}
                <div
                  aria-hidden
                  className="hidden items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-deep shadow-sm md:inline-flex md:invisible"
                >
                  <Star className="h-3.5 w-3.5 fill-current" /> Recomendado
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-deep">Kit Básico</h3>
                <p className="mt-1 text-sm text-muted-foreground">10 jogos — para começar</p>

                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-3 py-1 text-xs font-bold text-red-700">
                  <Flame className="h-3.5 w-3.5" /> 60% OFF de lançamento
                </div>
                <div className="mt-3 flex items-end justify-center gap-2">
                  <span className="text-lg font-medium text-muted-foreground line-through decoration-red-500/70">
                    R$49,90
                  </span>
                  <span className="font-display text-5xl font-bold text-deep md:text-6xl">
                    R$17,90
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  pagamento único · acesso para sempre
                </p>

                <p className="mt-6 text-xs font-bold uppercase tracking-wide text-gold-ink">
                  Tipos de jogos incluídos
                </p>
                <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                  {baseKinds.map((k) => (
                    <span
                      key={k}
                      className="rounded-full bg-gold/15 px-2.5 py-1 text-xs font-medium text-gold-ink ring-1 ring-gold/30"
                    >
                      {k}
                    </span>
                  ))}
                </div>

                {/* Espaçador invisível espelhando o bônus do Completo (o Básico não
                    inclui bônus) — mantém os cards simétricos no desktop. Removido
                    no mobile empilhado para não deixar um vão branco no card. */}
                <div
                  aria-hidden
                  className="hidden mt-5 rounded-xl border border-dashed border-gold/50 bg-gold/10 p-3 md:block md:invisible"
                >
                  <div className="flex items-center justify-center gap-1.5 pb-1.5 text-[0.7rem] font-bold uppercase tracking-wide text-gold-ink">
                    <Gift className="h-4 w-4" /> Bônus grátis incluso
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-card px-3 py-2 shadow-sm ring-1 ring-gold/15">
                    <BookOpen className="h-4 w-4 shrink-0 text-gold-ink" />
                    <span className="text-left text-sm font-semibold leading-tight text-card-foreground">
                      +100 Versículos organizados por temas
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative mt-auto flex flex-col items-center gap-3 pt-6">
                <a
                  href="https://go.perfectpay.com.br/PPU38CQE5MD"
                  rel="noopener noreferrer"
                  className="btn-cta btn-pulse w-full justify-center"
                >
                  Quero o Kit Básico
                  <ArrowRight className="h-5 w-5" />
                </a>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-gold" /> Compra segura · garantia de 7 dias
                </div>
              </div>
            </div>
          </div>

          {/* Confiança transacional próxima da oferta (plano seção 10) */}
          <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-3 sm:mt-10">
            <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
              <Lock className="h-3.5 w-3.5 text-[#8B6914]" aria-hidden="true" />
              Ambiente seguro · processado por PerfectPay
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              <PayBadge>VISA</PayBadge>
              <PayBadge>Mastercard</PayBadge>
              <PayBadge>Elo</PayBadge>
              <PayBadge>Pix</PayBadge>
              <span className="inline-flex h-7 items-center gap-1 rounded-md border border-[#E7D9B4] bg-white px-2.5 text-[0.7rem] font-semibold text-deep/80 shadow-sm sm:h-8 sm:text-xs">
                <Lock className="h-3 w-3 text-[#8B6914]" aria-hidden="true" /> SSL 256-bit
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 10 — GARANTIA: inversão de risco */}
      <section className="bg-secondary/60 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl rounded-3xl border-2 border-gold/40 bg-card/80 p-6 text-center shadow-lg backdrop-blur-sm sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold/30 to-gold/5 ring-1 ring-gold/30">
            <ShieldCheck className="h-8 w-8 text-gold-ink" />
          </div>
          <h2 className="mt-5 font-display text-2xl font-bold text-deep sm:text-3xl">
            Você tem 7 dias para conhecer o material sem risco
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground sm:text-lg">
            Teste o kit durante 7 dias. Se o seu filho não pedir para jogar de novo, ou se você
            simplesmente não amar o material, é só avisar dentro do prazo que devolvemos{" "}
            <span className="font-semibold text-foreground">100% do seu dinheiro</span>. O risco é
            todo nosso.
          </p>
        </div>
      </section>

      {/* 11 — FAQ */}
      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="section-eyebrow">Dúvidas frequentes</span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl md:text-4xl">
              Ainda tem alguma dúvida?
            </h2>
          </div>
          <Suspense fallback={<div className="mt-10 sm:mt-14" />}>
            <FaqAccordion faqs={faqs} />
          </Suspense>
        </div>
      </section>

      {/* 12 — CTA FINAL + SEGURANÇA */}
      <section className="bg-deep px-4 py-16 text-cream sm:px-6 sm:py-24 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Cross className="mx-auto h-8 w-8 text-gold" />
          <h2 className="mt-6 text-2xl font-bold sm:text-3xl md:text-4xl">
            A infância não precisa de uma aula a mais. Pode precisar de mais um momento com você.
          </h2>
          <p className="mt-5 text-base text-cream/75 sm:mt-6 sm:text-lg">
            Coloque a Palavra na mesa de um jeito leve, divertido e possível para a rotina que vocês
            têm hoje.
          </p>
          <div className="mt-8 sm:mt-10">
            <CTAButton>Quero receber os Jogos Bíblicos</CTAButton>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-cream/70">
            <span className="inline-flex items-center gap-1.5">
              <Download className="h-4 w-4 text-gold" /> Acesso imediato
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-gold" /> Pagamento único
            </span>
            <span className="inline-flex items-center gap-1.5">
              <RotateCcw className="h-4 w-4 text-gold" /> Garantia de 7 dias
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Lock className="h-4 w-4 text-gold" /> Compra segura
            </span>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 bg-deep px-4 py-10 text-center text-sm text-cream/70 sm:px-6 sm:py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:gap-7">
          {/* Suporte */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold/80">
              Suporte
            </span>
            <a
              href="mailto:suporte@achadinhosbiblicos.com.br"
              className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-2 pl-2 pr-4 backdrop-blur-sm transition duration-300 hover:border-gold/40 hover:bg-white/10 sm:pr-5"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gold/30 to-gold/5 ring-1 ring-gold/30 transition-transform duration-300 group-hover:scale-110 sm:h-9 sm:w-9">
                <Mail className="h-4 w-4 text-gold sm:h-4.5 sm:w-4.5" />
              </span>
              <span className="text-sm font-medium text-cream sm:text-base">
                suporte@achadinhosbiblicos.com.br
              </span>
            </a>
            <p className="text-xs text-cream/70">Tiramos suas dúvidas antes e depois da compra.</p>
          </div>

          <div className="h-px w-full max-w-xs bg-white/10" />

          {/* Marca + copyright */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <Cross className="h-4 w-4 text-gold" />
              <span className="font-display text-cream">Achadinhos Bíblicos</span>
            </div>
            <p>© {new Date().getFullYear()} Achadinhos Bíblicos · Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* CTA sticky no mobile — rola até a oferta */}
      <StickyMobileCTA />
    </main>
  );
}

// Slideshow de fotos reais do produto — usado na seção de mecanismo. Auto-avança
// só quando visível (useAutoRotate) para não gastar CPU/bateria fora da dobra.
function RealProductSlideshow() {
  const { current, setCurrent, ref } = useAutoRotate<HTMLDivElement>(realProducts.length, 2200);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden rounded-2xl border bg-card shadow-xl sm:rounded-3xl"
      style={{ aspectRatio: "1" }}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {realProducts.map((p) => (
          <img
            key={p.src}
            src={p.src}
            srcSet={srcSetFor(p.src)}
            sizes="(min-width: 1024px) 560px, 90vw"
            alt={p.alt}
            loading="lazy"
            decoding="async"
            width={820}
            height={820}
            className="h-full w-full flex-shrink-0 object-cover"
            fetchPriority="low"
          />
        ))}
      </div>
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {realProducts.map((p, i) => (
          <button
            key={p.src}
            onClick={() => setCurrent(i)}
            aria-label={`Ver imagem ${i + 1}`}
            className={`h-2 w-2 rounded-full transition-colors duration-300 ${
              i === current ? "bg-cream" : "bg-cream/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
