import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Hexagon from "../components/Icons/Hexagon";
import Help from "../components/Icons/Help";
import Impostos from "../components/Icons/Impostos";
import Minion from "../components/Icons/Minion";
import Modal from "../components/Modal";
import cloudinary from "../utils/cloudinary";
import getBase64ImageUrl from "../utils/generateBlurPlaceholder";
import type { ImageProps } from "../utils/types";
import { useLastViewedPhoto } from "../utils/useLastViewedPhoto";

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter();
  const { photoId } = router.query;
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  return (
    <>
      <Head>
        <title>Plunct plact zum, acabei de taxar mais um!</title>
        <meta
          property="og:image"
          content="https://taxad.vercel.app/help.svg"
        />
        <meta name="twitter:card" content="summary" />
        <meta property="twitter:title" content="Plunct plact zum, acabei de taxar mais um!" />
        <meta
          property="twitter:description"
          content="Brasil caminha para ser o país com os maiores impostos do mundo..."
        />
        <meta
          property="twitter:image"
          content="https://taxad.vercel.app/help.svg"
        />
        <meta
          property="twitter:url"
          content="https://taxad.vercel.app/"
        />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId);
            }}
          />
        )}
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4 mb-1">
          <div className="after:content relative flex h-[470px] flex-col items-center justify-end gap-5 overflow-hidden rounded-lg bg-white/10 px-6 pb-11 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0 mb-3">
            <div className="absolute justify-center opacity-40 mb-0">
              <Help />
            </div>
            <div className="absolute h-[639px] inset-0 flex items-center justify-center opacity-20 mb-0">
              <span className="flex h-[639px] max-w-full items-center justify-center">
                <Hexagon />
              </span>
            </div>
            <div className="mt-0 mb-0 absolute top-[20px]">
              <h1 className="text-2xl font-bold uppercase tracking-widest mb-2 shadow-slate-300">
                O REINO PERDIDO
              </h1>
              <p className="max-w-[7  0ch] sm:max-w-[60ch] text-2xl font-bold drop-shadow-lg shadow-slate-300 px-4">
                O governo 2019-2022, foi o responsável pelo maior programa de distribuição de renda do mundo, salvou o Brasil de uma pandemia, evitou uma crise alimentar que afetaria o mundo, travou a maior luta da história contra o crime organizado. 
              </p>
              <p className="max-w-[7  0ch] sm:max-w-[60ch] text-2xl font-bold drop-shadow-lg shadow-slate-300 px-4">
                Fez tudo isso sem aumentar um centavo de imposto e ainda deixou um saldo positivo recorde histórico de 53bilhões. 
              </p>
              <p className="max-w-[7  0ch] sm:max-w-[60ch] text-2xl font-bold drop-shadow-lg shadow-slate-300 px-4">  
                Agora estamos com um rombo de mais de 200bilhões e quase o maior imposto do mundo... 
              </p>
              <br />
              <a
                className="pointer z-10 rounded-lg border border-white bg-green-700 px-3 py-2 text-sm font-semibold text-yellow transition hover:bg-yellow-300 hover:text-green-900 mt-1 mb-0"
                href="https://abusofederal.vercel.app/imposto"
                target="_blank"
                rel="noreferrer"
              >
                Impostos reduzidos entre 2019{"-"}2022
              </a>
            </div>
          </div>
          {images.map(({ id, public_id, format, blurDataUrl }) => (
            <Link
              key={id}
              href={`/?photoId=${id}`}
              as={`/p/${id}`}
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              shallow
              className="mb-3 after:content group relative mb-15 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <Image
                alt="Plunct plact zum, acabei de taxar mais um!"
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: "translate3d(0, 0, 0)" }}
                placeholder="blur"
                blurDataURL={blurDataUrl}
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
            </Link>
          ))}
        </div>
        <span
          onClick={scrollToTop}
          className="text-neutral-700 w-4 h-4 fixed bottom-2 right-1 p-5 zindex bg-slate-200 opacity-50 rounded-full"
        >
          <FontAwesomeIcon
            icon={faArrowUp}
            className="absolute top-2 left-2 size-6"
          />
        </span>
      </main>
      <div className="mx-auto max-w-2xl md:text-center">
        <p className="flex justify-center">    
          <Impostos />
        </p>
      </div>      
      <footer className="p-6 text-center text-white/80 sm:p-12 content-center">
        <div className="max-w-full md:text-center">      
          <p className="text-3xl drop-shadow-lg text-slate-300 m-10 flex justify-center">        
            O rei que exerce a justiça dá estabilidade ao país, mas o que gosta de subornos o leva à ruína.
            <br/>
            ~~Provérbios: 30-4
          </p>
        </div>
        <div className="react-reveal">
          <div className="social">
            <a target="_blank" rel="noopener" href="https://x.com/intent/post?text=Plunct%20plact%20zum%2C%20acabei%20de%20taxar%20mais%20um!%0A%0A&amp;url=https%3A%2F%2Ftaxad.vercel.app%2F" className="social-icon" aria-label="twitter" ><div className="social-container" ><svg className="social-svg" viewBox="0 0 64 64" ><g className="social-svg-background" ><path d="m 48.1,22.1 c -1.223105,0.430685 -2.4,0.761371 -3.8,1 1.4,-0.8 2.4,-2.1 2.9,-3.6 -1.3,0.8 -2.7,1.3 -4.2,1.6 -1.2,-1.3 -3,-2.1 -4.8,-2.1 -3.6,0 -6.6,2.9 -6.6,6.6 0,0.5 0.1,1 0.2,1.5 -5.5,-0.3 -10.3,-2.9 -13.5,-6.9 -0.6,1 -0.9,2.1 -0.9,3.3 0,2.3 1.2,4.3 2.9,5.5 -1.1,0 -2.1,-0.3 -3,-0.8 v 0.1 c 0,3.2 2.3,5.8 5.3,6.4 -0.6,0.1 -1.1,0.2 -1.7,0.2 -0.4,0 -0.8,0 -1.2,-0.1 0.8,2.6 3.3,4.5 6.1,4.6 -2.2,1.8 -5.1,2.8 -8.2,2.8 -0.5,0 -1.1,0 -1.6,-0.1 C 18.9,44 22.4,45 26.1,45 38.2,45 44.43575,34.996634 44.67774,26.3 L 44.7,25.5 c 1.2,-1 2.5,-2.1 3.4,-3.4 z"></path></g><g className="social-svg-mask" ><path d="M0,0v64h64V0H0z M44.7,25.5c0,0.3,0,0.6,0,0.8C44.7,35,38.1,45,26.1,45c-3.7,0-7.2-1.1-10.1-2.9 c0.5,0.1,1,0.1,1.6,0.1c3.1,0,5.9-1,8.2-2.8c-2.9-0.1-5.3-2-6.1-4.6c0.4,0.1,0.8,0.1,1.2,0.1c0.6,0,1.2-0.1,1.7-0.2 c-3-0.6-5.3-3.3-5.3-6.4c0,0,0-0.1,0-0.1c0.9,0.5,1.9,0.8,3,0.8c-1.8-1.2-2.9-3.2-2.9-5.5c0-1.2,0.3-2.3,0.9-3.3 c3.2,4,8.1,6.6,13.5,6.9c-0.1-0.5-0.2-1-0.2-1.5c0-3.6,2.9-6.6,6.6-6.6c1.9,0,3.6,0.8,4.8,2.1c1.5-0.3,2.9-0.8,4.2-1.6 c-0.5,1.5-1.5,2.8-2.9,3.6c1.3-0.2,2.6-0.5,3.8-1C47.1,23.4,46,24.5,44.7,25.5z"></path></g></svg>
              </div>
            </a>
            <a target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=https://taxad.vercel.app&amp;text=Plunct%20plact%20zum%2C%20acabei%20de%20taxar%20mais%20um!%0A%0A%20" className="social-icon" aria-label="facebook"><div className="social-container" >
                <svg className="social-svg" viewBox="0 0 64 64" ><g className="social-svg-background" ><path d="M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z"></path></g><g className="social-svg-mask" ><path d="M0,0v64h64V0H0z M39.6,22l-2.8,0c-2.2,0-2.6,1.1-2.6,2.6V28h5.3l-0.7,5.3h-4.6V47h-5.5V33.3H24V28h4.6V24 c0-4.6,2.8-7,6.9-7c2,0,3.6,0.1,4.1,0.2V22z"></path></g></svg></div>
            </a>
            <a target="_blank" rel="noopener" href="https://api.whatsapp.com/send?phone=&amp;text=Plunct%20plact%20zum%2C%20acabei%20de%20taxar%20mais%20um!%0A%0A%20https://taxad.vercel.app/" className="social-icon" aria-label="whatsapp" ><div className="social-container" ><svg className="social-svg" viewBox="0 0 64 64" ><g className="social-svg-background" ><path d="M 48 31.589844 C 48 40.195312 40.96875 47.175781 32.289062 47.175781 C 29.535156 47.175781 26.949219 46.472656 24.695312 45.234375 L 16 48 L 18.835938 39.636719 C 17.40625 37.289062 16.582031 34.53125 16.582031 31.589844 C 16.582031 22.980469 23.613281 16 32.289062 16 C 40.96875 16 48 22.980469 48 31.589844 Z M 32.289062 18.484375 C 25.007812 18.484375 19.082031 24.363281 19.082031 31.589844 C 19.082031 34.457031 20.019531 37.109375 21.597656 39.269531 L 19.949219 44.136719 L 25.023438 42.527344 C 27.109375 43.894531 29.609375 44.691406 32.292969 44.691406 C 39.574219 44.691406 45.5 38.816406 45.5 31.589844 C 45.5 24.363281 39.574219 18.484375 32.289062 18.484375 Z M 40.222656 35.179688 C 40.125 35.019531 39.871094 34.921875 39.484375 34.730469 C 39.101562 34.542969 37.207031 33.617188 36.855469 33.488281 C 36.5 33.363281 36.242188 33.296875 35.988281 33.679688 C 35.730469 34.0625 34.992188 34.921875 34.769531 35.179688 C 34.542969 35.433594 34.320312 35.464844 33.933594 35.273438 C 33.546875 35.082031 32.308594 34.679688 30.835938 33.378906 C 29.691406 32.367188 28.917969 31.117188 28.695312 30.734375 C 28.472656 30.351562 28.671875 30.144531 28.863281 29.953125 C 29.039062 29.78125 29.25 29.507812 29.441406 29.285156 C 29.636719 29.0625 29.699219 28.902344 29.828125 28.648438 C 29.957031 28.390625 29.890625 28.167969 29.792969 27.976562 C 29.699219 27.785156 28.925781 25.90625 28.605469 25.140625 C 28.285156 24.375 27.964844 24.503906 27.742188 24.503906 C 27.515625 24.503906 27.257812 24.472656 27.003906 24.472656 C 26.746094 24.472656 26.328125 24.566406 25.976562 24.949219 C 25.621094 25.332031 24.628906 26.257812 24.628906 28.136719 C 24.628906 30.015625 26.007812 31.832031 26.199219 32.085938 C 26.394531 32.34375 28.863281 36.324219 32.777344 37.855469 C 36.691406 39.386719 36.691406 38.875 37.398438 38.8125 C 38.105469 38.746094 39.675781 37.886719 40 36.996094 C 40.320312 36.101562 40.320312 35.335938 40.222656 35.179688 Z M 40.222656 35.179688"></path></g><g className="social-svg-mask" ><path d="M0,0v64h64V0H0z M 48 31.589844 C 48 40.195312 40.96875 47.175781 32.289062 47.175781 C 29.535156 47.175781 26.949219 46.472656 24.695312 45.234375 L 16 48 L 18.835938 39.636719 C 17.40625 37.289062 16.582031 34.53125 16.582031 31.589844 C 16.582031 22.980469 23.613281 16 32.289062 16 C 40.96875 16 48 22.980469 48 31.589844 Z M 32.289062 18.484375 C 25.007812 18.484375 19.082031 24.363281 19.082031 31.589844 C 19.082031 34.457031 20.019531 37.109375 21.597656 39.269531 L 19.949219 44.136719 L 25.023438 42.527344 C 27.109375 43.894531 29.609375 44.691406 32.292969 44.691406 C 39.574219 44.691406 45.5 38.816406 45.5 31.589844 C 45.5 24.363281 39.574219 18.484375 32.289062 18.484375 Z M 40.222656 35.179688 C 40.125 35.019531 39.871094 34.921875 39.484375 34.730469 C 39.101562 34.542969 37.207031 33.617188 36.855469 33.488281 C 36.5 33.363281 36.242188 33.296875 35.988281 33.679688 C 35.730469 34.0625 34.992188 34.921875 34.769531 35.179688 C 34.542969 35.433594 34.320312 35.464844 33.933594 35.273438 C 33.546875 35.082031 32.308594 34.679688 30.835938 33.378906 C 29.691406 32.367188 28.917969 31.117188 28.695312 30.734375 C 28.472656 30.351562 28.671875 30.144531 28.863281 29.953125 C 29.039062 29.78125 29.25 29.507812 29.441406 29.285156 C 29.636719 29.0625 29.699219 28.902344 29.828125 28.648438 C 29.957031 28.390625 29.890625 28.167969 29.792969 27.976562 C 29.699219 27.785156 28.925781 25.90625 28.605469 25.140625 C 28.285156 24.375 27.964844 24.503906 27.742188 24.503906 C 27.515625 24.503906 27.257812 24.472656 27.003906 24.472656 C 26.746094 24.472656 26.328125 24.566406 25.976562 24.949219 C 25.621094 25.332031 24.628906 26.257812 24.628906 28.136719 C 24.628906 30.015625 26.007812 31.832031 26.199219 32.085938 C 26.394531 32.34375 28.863281 36.324219 32.777344 37.855469 C 36.691406 39.386719 36.691406 38.875 37.398438 38.8125 C 38.105469 38.746094 39.675781 37.886719 40 36.996094 C 40.320312 36.101562 40.320312 35.335938 40.222656 35.179688 Z M 40.222656 35.179688"></path></g></svg></div>
            </a>
            <a target="_blank" rel="noopener" href="https://telegram.me/share/url?url=https://taxad.vercel.app/&amp;text=Plunct%20plact%20zum%2C%20acabei%20de%20taxar%20mais%20um!%0A%0A" className="social-icon" aria-label="telegram" ><div className="social-container" ><svg className="social-svg" viewBox="0 0 64 64" ><g className="social-svg-background" ><path d="M 11.886719 33.476562 C 15.617188 31.421875 19.78125 29.707031 23.671875 27.980469 C 30.367188 25.15625 37.085938 22.382812 43.875 19.800781 C 45.199219 19.359375 47.570312 18.929688 47.804688 20.886719 C 47.675781 23.660156 47.152344 26.414062 46.792969 29.167969 C 45.878906 35.222656 44.824219 41.261719 43.796875 47.300781 C 43.441406 49.308594 40.921875 50.351562 39.308594 49.0625 C 35.4375 46.449219 31.53125 43.855469 27.710938 41.179688 C 26.457031 39.90625 27.617188 38.078125 28.738281 37.167969 C 31.925781 34.023438 35.3125 31.351562 38.335938 28.046875 C 39.152344 26.074219 36.742188 27.734375 35.945312 28.246094 C 31.578125 31.253906 27.316406 34.449219 22.710938 37.09375 C 20.359375 38.390625 17.617188 37.28125 15.265625 36.558594 C 13.15625 35.6875 10.066406 34.808594 11.886719 33.476562 Z M 11.886719 33.476562"></path></g><g className="social-svg-mask" ><path d="M0,0v64h64V0H0z M 11.886719 33.476562 C 15.617188 31.421875 19.78125 29.707031 23.671875 27.980469 C 30.367188 25.15625 37.085938 22.382812 43.875 19.800781 C 45.199219 19.359375 47.570312 18.929688 47.804688 20.886719 C 47.675781 23.660156 47.152344 26.414062 46.792969 29.167969 C 45.878906 35.222656 44.824219 41.261719 43.796875 47.300781 C 43.441406 49.308594 40.921875 50.351562 39.308594 49.0625 C 35.4375 46.449219 31.53125 43.855469 27.710938 41.179688 C 26.457031 39.90625 27.617188 38.078125 28.738281 37.167969 C 31.925781 34.023438 35.3125 31.351562 38.335938 28.046875 C 39.152344 26.074219 36.742188 27.734375 35.945312 28.246094 C 31.578125 31.253906 27.316406 34.449219 22.710938 37.09375 C 20.359375 38.390625 17.617188 37.28125 15.265625 36.558594 C 13.15625 35.6875 10.066406 34.808594 11.886719 33.476562 Z M 11.886719 33.476562"></path></g></svg></div>
            </a>
            <a target="_blank" rel="noopener" href="https://www.linkedin.com/shareArticle?text=Plunct%20plact%20zum%2C%20acabei%20de%20taxar%20mais%20um!%0A%0A&amp;mini=true&amp;url=https://taxad.vercel.app/" className="social-icon" aria-label="linkedin" ><div className="social-container" ><svg className="social-svg" viewBox="0 0 64 64" ><g className="social-svg-background" ><path d="M20.4,44h5.4V26.6h-5.4V44z M23.1,18c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1 c1.7,0,3.1-1.4,3.1-3.1C26.2,19.4,24.8,18,23.1,18z M39.5,26.2c-2.6,0-4.4,1.4-5.1,2.8h-0.1v-2.4h-5.2V44h5.4v-8.6 c0-2.3,0.4-4.5,3.2-4.5c2.8,0,2.8,2.6,2.8,4.6V44H46v-9.5C46,29.8,45,26.2,39.5,26.2z"></path></g><g className="social-svg-mask" ><path d="M0,0v64h64V0H0z M25.8,44h-5.4V26.6h5.4V44z M23.1,24.3c-1.7,0-3.1-1.4-3.1-3.1c0-1.7,1.4-3.1,3.1-3.1 c1.7,0,3.1,1.4,3.1,3.1C26.2,22.9,24.8,24.3,23.1,24.3z M46,44h-5.4v-8.4c0-2,0-4.6-2.8-4.6c-2.8,0-3.2,2.2-3.2,4.5V44h-5.4V26.6 h5.2V29h0.1c0.7-1.4,2.5-2.8,5.1-2.8c5.5,0,6.5,3.6,6.5,8.3V44z"></path></g></svg></div>
            </a>
          </div>
        </div>
      <div className="w-[128px] p-1 mx-auto my-4 text-center">
          <img
            src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Ftaxad.vercel.app%2F&label=visitantes&countColor=%23263759"
            alt="visitantes"
            loading="lazy"
          />
        </div>        
      </footer>
      <div className="max-w-full md:text-center">      
        <p className="text-base drop-shadow-lg text-slate-300 mb-5 flex justify-center">
        ESCLARECIMENTO<br />
        Este espaço é dedicado ao trabalho voluntário com o objetivo de estudar tecnologias, sem qualquer financiamento ou vínculo com indivíduos, partidos ou políticos.<br/>
        As imagens utilizadas foram encontradas na internet e não possuem menção de direitos autorais. <br/>
        O espaço foi criado para praticar habilidades e realizar testes em tecnologias de programação.
        </p>
      </div>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by("public_id", "desc")
    .max_results(400)
    .execute();
  let reducedResults: ImageProps[] = [];

  let i = 0;
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    });
    i++;
  }

  const blurImagePromises = results.resources.map((image: ImageProps) => {
    return getBase64ImageUrl(image);
  });
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i];
  }

  return {
    props: {
      images: reducedResults,
    },
  };
}
