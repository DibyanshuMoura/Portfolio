import type { StaticImageData } from "next/image";
import catWhoTaughtZen from "../../Assets/Covers/cat-who-taught-zen.jpg";
import handsOnMachineLearning from "../../Assets/Covers/hands-on-machine-learning.jpg";
import ikigai from "../../Assets/Covers/ikigai.jpg";
import lawsOfHumanNature from "../../Assets/Covers/laws-of-human-nature.jpg";
import subtleArt from "../../Assets/Covers/subtle-art.jpg";

export type Book = {
  title: string;
  author: string;
  cover: StaticImageData;
};

export const books: readonly Book[] = [
  {
    title: "The Cat Who Taught Zen",
    author: "James Norbury",
    cover: catWhoTaughtZen,
  },
  {
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    cover: subtleArt,
  },
  {
    title: "The Laws of Human Nature",
    author: "Robert Greene",
    cover: lawsOfHumanNature,
  },
  {
    title: "Ikigai",
    author: "Héctor García & Francesc Miralles",
    cover: ikigai,
  },
  {
    title: "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow",
    author: "Aurélien Géron",
    cover: handsOnMachineLearning,
  },
];
