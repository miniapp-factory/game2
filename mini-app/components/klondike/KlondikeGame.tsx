import { useEffect, useState } from "react";

const suits = ["♠", "♥", "♦", "♣"];
const ranks = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

type Card = {
  suit: string;
  rank: string;
  faceUp: boolean;
};

function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ suit, rank, faceUp: false });
    }
  }
  return deck;
}

function shuffle(array: Card[]): Card[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function KlondikeGame() {
  const [tableau, setTableau] = useState<Card[][]>([]);
  const [stock, setStock] = useState<Card[]>([]);
  const [waste, setWaste] = useState<Card[]>([]);
  const [foundations, setFoundations] = useState<Card[][]>([[], [], [], []]);

  useEffect(() => {
    const deck = shuffle(createDeck());
    const newTableau: Card[][] = [];
    let deckIndex = 0;
    for (let i = 0; i < 7; i++) {
      const pile: Card[] = [];
      for (let j = 0; j <= i; j++) {
        const card = deck[deckIndex++];
        card.faceUp = j === i;
        pile.push(card);
      }
      newTableau.push(pile);
    }
    setTableau(newTableau);
    setStock(deck.slice(deckIndex));
  }, []);

  const moveToFoundation = (source: "waste" | "tableau", index?: number) => {
    const sourceArray =
      source === "waste" ? waste : tableau[index!];
    if (!sourceArray || sourceArray.length === 0) return;
    const card = sourceArray[sourceArray.length - 1];
    const foundationIndex = suits.indexOf(card.suit);
    const foundation = foundations[foundationIndex];
    const canMove =
      foundation.length === 0 ||
      (foundation[foundation.length - 1].rank === ranks[ranks.indexOf(card.rank) - 1]);

    if (!canMove) return;

    const newFoundations = [...foundations];
    newFoundations[foundationIndex] = [...foundation, card];

    if (source === "waste") {
      setWaste(waste.slice(0, -1));
    } else {
      const newTableau = [...tableau];
      newTableau[index!] = sourceArray.slice(0, -1);
      if (newTableau[index!].length > 0) {
        newTableau[index!][newTableau[index!].length - 1].faceUp = true;
      }
      setTableau(newTableau);
    }
    setFoundations(newFoundations);
  };

  const moveTableauToTableau = (from: number, to: number) => {
    const fromPile = tableau[from];
    const toPile = tableau[to];
    if (!fromPile || fromPile.length === 0) return;
    const card = fromPile[fromPile.length - 1];
    const canMove =
      toPile.length === 0 ||
      (toPile[toPile.length - 1].rank === ranks[ranks.indexOf(card.rank) + 1] &&
        toPile[toPile.length - 1].suit !== card.suit);

    if (!canMove) return;

    const newTableau = [...tableau];
    newTableau[to] = [...toPile, card];
    newTableau[from] = fromPile.slice(0, -1);
    if (newTableau[from].length > 0) {
      newTableau[from][newTableau[from].length - 1].faceUp = true;
    }
    setTableau(newTableau);
  };

  const drawFromStock = () => {
    if (stock.length === 0) {
      setStock(waste);
      setWaste([]);
      return;
    }
    const card = stock[0];
    card.faceUp = true;
    setWaste([...waste, card]);
    setStock(stock.slice(1));
  };

  const cardStyle = (card: Card) =>
    `w-12 h-20 rounded-md border flex items-center justify-center ${
      card.faceUp ? "bg-white" : "bg-gray-400"
    } ${card.suit === "♥" || card.suit === "♦" ? "text-red-600" : "text-black"}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4">
        {foundations.map((pile, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-12 h-20 rounded-md border bg-gray-200 flex items-center justify-center">
              {pile.length > 0 ? (
                <span className={cardStyle(pile[pile.length - 1])}>
                  {pile[pile.length - 1].rank}
                  {pile[pile.length - 1].suit}
                </span>
              ) : (
                <span className="text-gray-400">F{i + 1}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <div
          className="w-12 h-20 rounded-md border bg-gray-200 flex items-center justify-center cursor-pointer"
          onClick={drawFromStock}
        >
          {stock.length > 0 ? <span className="text-gray-400">Stock</span> : <span className="text-gray-400">Empty</span>}
        </div>

        <div
          className="w-12 h-20 rounded-md border bg-gray-200 flex items-center justify-center cursor-pointer"
          onClick={() => moveToFoundation("waste")}
        >
          {waste.length > 0 ? (
            <span className={cardStyle(waste[waste.length - 1])}>
              {waste[waste.length - 1].rank}
              {waste[waste.length - 1].suit}
            </span>
          ) : (
            <span className="text-gray-400">Waste</span>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        {tableau.map((pile, i) => (
          <div key={i} className="flex flex-col gap-1">
            {pile.map((card, j) => (
              <div
                key={j}
                className={cardStyle(card)}
                onClick={() => {
                  if (j === pile.length - 1) {
                    // click on top card
                    moveToFoundation("tableau", i);
                  } else {
                    // click on any card to move to another tableau
                    // For simplicity, we only allow moving the top card
                  }
                }}
              >
                {card.faceUp ? `${card.rank}${card.suit}` : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
