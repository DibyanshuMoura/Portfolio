import type { StaticImageData } from "next/image";
import coherencePoster from "../../Assets/Posters/coherence.webp";
import darkPoster from "../../Assets/Posters/dark.webp";
import fromPoster from "../../Assets/Posters/from.webp";
import inceptionPoster from "../../Assets/Posters/inception.webp";
import interstellarPoster from "../../Assets/Posters/interstellar.webp";
import irattaPoster from "../../Assets/Posters/iratta.webp";
import kgfChapter1Poster from "../../Assets/Posters/kgf-chapter-1.webp";
import kgfChapter2Poster from "../../Assets/Posters/kgf-chapter-2.webp";
import kishkindhaKaandamPoster from "../../Assets/Posters/kishkindha-kaandam.webp";
import maharajaPoster from "../../Assets/Posters/maharaja.webp";
import marcoPoster from "../../Assets/Posters/marco.webp";
import mementoPoster from "../../Assets/Posters/memento.webp";
import predestinationPoster from "../../Assets/Posters/predestination.webp";
import salaarPoster from "../../Assets/Posters/salaar.webp";
import shutterIslandPoster from "../../Assets/Posters/shutter-island.webp";
import strangerThingsPoster from "../../Assets/Posters/stranger-things.webp";
import tenetPoster from "../../Assets/Posters/tenet.webp";
import theHangoverPart2Poster from "../../Assets/Posters/the-hangover-part-ii.webp";
import theHangoverPart3Poster from "../../Assets/Posters/the-hangover-part-iii.webp";
import theHangoverPoster from "../../Assets/Posters/the-hangover.webp";
import theMentalistPoster from "../../Assets/Posters/the-mentalist.webp";
import thudarumPoster from "../../Assets/Posters/thudarum.webp";
import trianglePoster from "../../Assets/Posters/triangle.webp";

export type Watch = {
  title: string;
  year: string;
  cover: StaticImageData;
};

export const watchedFilms: readonly Watch[] = [
  {
    title: "Inception",
    year: "2010",
    cover: inceptionPoster,
  },
  {
    title: "Memento",
    year: "2000",
    cover: mementoPoster,
  },
  {
    title: "Interstellar",
    year: "2014",
    cover: interstellarPoster,
  },
  {
    title: "Triangle",
    year: "2009",
    cover: trianglePoster,
  },
  {
    title: "Kishkindha Kaandam",
    year: "2024",
    cover: kishkindhaKaandamPoster,
  },
  {
    title: "Iratta",
    year: "2023",
    cover: irattaPoster,
  },
  {
    title: "Thudarum",
    year: "2025",
    cover: thudarumPoster,
  },
  {
    title: "Tenet",
    year: "2020",
    cover: tenetPoster,
  },
  {
    title: "KGF: Chapter 1",
    year: "2018",
    cover: kgfChapter1Poster,
  },
  {
    title: "KGF: Chapter 2",
    year: "2022",
    cover: kgfChapter2Poster,
  },
  {
    title: "Salaar",
    year: "2023",
    cover: salaarPoster,
  },
  {
    title: "Marco",
    year: "2024",
    cover: marcoPoster,
  },
  {
    title: "Coherence",
    year: "2013",
    cover: coherencePoster,
  },
  {
    title: "Predestination",
    year: "2014",
    cover: predestinationPoster,
  },
  {
    title: "The Hangover",
    year: "2009",
    cover: theHangoverPoster,
  },
  {
    title: "The Hangover Part II",
    year: "2011",
    cover: theHangoverPart2Poster,
  },
  {
    title: "The Hangover Part III",
    year: "2013",
    cover: theHangoverPart3Poster,
  },
  {
    title: "Shutter Island",
    year: "2010",
    cover: shutterIslandPoster,
  },
  {
    title: "Maharaja",
    year: "2024",
    cover: maharajaPoster,
  },
];

export const watchedSeries: readonly Watch[] = [
  {
    title: "Dark",
    year: "2017–2020",
    cover: darkPoster,
  },
  {
    title: "From",
    year: "2022–",
    cover: fromPoster,
  },
  {
    title: "Stranger Things",
    year: "2016–2025",
    cover: strangerThingsPoster,
  },
  {
    title: "The Mentalist",
    year: "2008–2015",
    cover: theMentalistPoster,
  },
];
