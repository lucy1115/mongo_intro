export type PostBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  cover: { src: string; alt: string };
  content: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "taiwan-mango-varieties",
    title: "台灣芒果品種大解析：愛文、金煌、土芒果怎麼選？",
    excerpt: "走進水果攤總是看到好多種芒果？一次認識台灣最常見的幾個品種，找到最合你口味的那一顆。",
    date: "2026-06-12",
    readMinutes: 4,
    cover: { src: "/images/mango-orchard.jpg", alt: "果園裡結實纍纍的芒果樹" },
    content: [
      {
        type: "paragraph",
        text: "台灣氣候溫暖、日照充足，是種植芒果的好地方。從南部的台南、屏東到高雄，每年夏天都會迎來一波芒果季。不過市面上的芒果品種很多，外觀、香氣和口感也大不相同，以下帶你認識最常見的幾種。",
      },
      { type: "heading", text: "愛文芒果：最受歡迎的紅色芒果" },
      {
        type: "paragraph",
        text: "愛文芒果外皮呈現漂亮的紅色，果肉細緻、纖維少，甜中帶點微酸，香氣濃郁，是台灣最具代表性的芒果，也是芒果冰的經典主角。產季大約在 6 到 7 月。",
      },
      { type: "heading", text: "金煌芒果：果實大、果肉厚" },
      {
        type: "paragraph",
        text: "金煌芒果體型修長、個頭大，成熟時外皮仍帶點黃綠色。果肉厚實、種子薄，甜度高而酸度低，一顆就能讓全家分著吃。產季通常比愛文稍晚，約在 7 到 8 月。",
      },
      { type: "heading", text: "土芒果：小小一顆，香氣十足" },
      {
        type: "paragraph",
        text: "土芒果是台灣很早就有栽種的品種，果實小、纖維較多，但香氣特別濃，帶有獨特的「芒果味」。很多人喜歡把它做成情人果或芒果乾，是許多人記憶中的古早味。",
      },
      { type: "heading", text: "怎麼選最適合自己的芒果？" },
      {
        type: "list",
        items: [
          "喜歡細緻口感、酸甜平衡：選愛文",
          "喜歡大口吃、甜度高：選金煌",
          "喜歡濃郁香氣、懷舊風味：選土芒果",
        ],
      },
      {
        type: "paragraph",
        text: "每個品種都有自己的魅力，不妨在芒果季多嘗試幾種，找到你心目中的第一名。",
      },
    ],
  },
  {
    slug: "how-to-pick-and-store-mangoes",
    title: "挑選與保存芒果的 5 個小技巧",
    excerpt: "怎麼判斷芒果熟了沒？買回家要不要冰？掌握這幾個訣竅，每一顆都能在最好吃的時候享用。",
    date: "2026-07-03",
    readMinutes: 3,
    cover: { src: "/images/mango-tray.jpg", alt: "一盤黃澄澄的芒果" },
    content: [
      {
        type: "paragraph",
        text: "好不容易買到漂亮的芒果，卻因為保存方式不對而太快變軟或放到沒味道，實在很可惜。以下 5 個小技巧，幫你從挑選到保存都不出錯。",
      },
      { type: "heading", text: "1. 聞香氣" },
      {
        type: "paragraph",
        text: "靠近果蒂的地方聞起來有明顯的甜香，通常代表芒果已經接近成熟。如果完全沒有味道，可能還需要再放幾天。",
      },
      { type: "heading", text: "2. 輕輕按壓" },
      {
        type: "paragraph",
        text: "用手指輕壓果實，稍微有彈性、像熟成的酪梨一樣，就是剛好可以吃的狀態。太硬代表還沒熟，太軟或有凹陷則可能過熟。",
      },
      { type: "heading", text: "3. 看外皮" },
      {
        type: "paragraph",
        text: "挑選表皮完整、沒有大片黑斑或破損的芒果。要注意，外皮顏色不一定代表熟度，有些品種成熟時仍帶有綠色。",
      },
      { type: "heading", text: "4. 還沒熟的芒果放室溫" },
      {
        type: "paragraph",
        text: "未成熟的芒果不要放冰箱，低溫會讓它無法正常熟成，甚至影響風味。放在陰涼通風的室溫處，通常幾天內就會慢慢變熟。",
      },
      { type: "heading", text: "5. 熟了之後再冷藏" },
      {
        type: "paragraph",
        text: "芒果熟成後可以用紙或保鮮袋包好放進冰箱冷藏，延長賞味期，並建議在幾天內吃完。吃不完的果肉可以切塊冷凍，之後拿來打冰沙也很方便。",
      },
      {
        type: "list",
        items: ["聞：果蒂附近有甜香", "壓：微微有彈性", "看：外皮完整無大片黑斑", "未熟放室溫，熟了再冷藏"],
      },
    ],
  },
  {
    slug: "mango-nutrition-and-recipes",
    title: "芒果的營養價值與 3 種簡單吃法",
    excerpt: "芒果不只好吃，還富含維生素 A 與 C。除了直接吃，這三種簡單做法讓你天天都能換花樣。",
    date: "2026-07-24",
    readMinutes: 4,
    cover: { src: "/images/mango-sliced.jpg", alt: "白色盤子上切好的芒果片" },
    content: [
      {
        type: "paragraph",
        text: "芒果被稱為「熱帶水果之王」，除了香甜的滋味，營養也相當豐富。了解它的營養價值，再搭配幾種簡單的吃法，讓芒果成為夏天餐桌上的常客。",
      },
      { type: "heading", text: "芒果有哪些營養？" },
      {
        type: "list",
        items: [
          "維生素 A（β-胡蘿蔔素）：果肉的金黃色就是來自它",
          "維生素 C：有助於維持身體正常運作",
          "膳食纖維：增加飽足感，幫助消化",
          "鉀：幫助維持體內水分平衡",
        ],
      },
      {
        type: "paragraph",
        text: "芒果的天然糖分不低，建議適量食用，一次大約一碗的份量就很足夠。另外，芒果皮和果蒂附近的汁液可能讓部分人皮膚過敏，容易過敏的人削皮時可以戴上手套。",
      },
      { type: "heading", text: "吃法一：芒果冰沙" },
      {
        type: "paragraph",
        text: "把冷凍芒果塊、少許牛奶或優格放進果汁機打勻，就是濃郁滑順的芒果冰沙。想要更清爽，可以加一點檸檬汁。",
      },
      { type: "heading", text: "吃法二：芒果優格杯" },
      {
        type: "paragraph",
        text: "在杯子裡依序鋪上無糖優格、芒果丁和燕麥脆片，重複兩三層，就是漂亮又營養的早餐。",
      },
      { type: "heading", text: "吃法三：芒果莎莎醬" },
      {
        type: "paragraph",
        text: "把芒果丁、紅洋蔥丁、番茄丁和香菜拌在一起，加入檸檬汁和一點鹽，就是酸甜開胃的莎莎醬，搭配烤雞或玉米片都很對味。",
      },
      {
        type: "paragraph",
        text: "芒果的吃法千變萬化，從飲品、早餐到料理都能派上用場。這個夏天，就用芒果為生活加點陽光吧！",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function formatDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${year} 年 ${Number(month)} 月 ${Number(day)} 日`;
}
