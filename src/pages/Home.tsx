import React from "react";

const Home: React.FC = () => {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base font-semibold text-indigo-600">
          Bienvenue à notre boulangerie
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
          Découvrez nos délicieux produits artisanaux
        </p>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {/* Premier produit : Pain */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                <p className="mt-2 text-center text-lg font-medium tracking-tight text-gray-950">
                  Pain Traditionnel
                </p>
                <p className="mt-2 max-w-lg text-center text-sm text-gray-600">
                  Notre pain traditionnel est croustillant à l'extérieur et
                  moelleux à l'intérieur, parfait pour accompagner vos repas.
                </p>
              </div>
              <div className="relative min-h-[30rem] w-full grow">
                <img
                  className="size-full object-cover object-center"
                  src="./images/product/pain_traditionnel1.jpeg"
                  alt="Pain traditionnel"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
          </div>

          {/* Deuxième produit : Croissants */}
          <div className="relative">
            <div className="absolute inset-px rounded-lg bg-white"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-center text-lg font-medium tracking-tight text-gray-950">
                  Croissants au beurre
                </p>
                <p className="mt-2 max-w-lg text-center text-sm text-gray-600">
                  Délicieux croissants dorés au beurre frais, parfaits pour le
                  petit-déjeuner ou une pause gourmande.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 py-6">
                <img
                  className="w-full max-lg:max-w-xs"
                  src="./images/product/pain_au_beure.jpg"
                  alt="Croissants au beurre"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
          </div>

          {/* Troisième produit : Tarte aux pommes */}
          <div className="relative lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-white"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-center text-lg font-medium tracking-tight text-gray-950">
                  Tarte aux pommes
                </p>
                <p className="mt-2 max-w-lg text-center text-sm text-gray-600">
                  Savourez notre tarte aux pommes maison, préparée avec des
                  pommes fraîches et une pâte dorée.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 py-6">
                <img
                  className="h-40 object-cover object-center"
                  src="./images/product/pomme_tarte.jpg"
                  alt="Tarte aux pommes"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
          </div>

          {/* Quatrième produit : Éclair au chocolat */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-r-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                <p className="mt-2 text-center text-lg font-medium tracking-tight text-gray-950">
                  Éclair au chocolat
                </p>
                <p className="mt-2 max-w-lg text-center text-sm text-gray-600">
                  Un éclair au chocolat fourré de crème onctueuse, parfait pour
                  un dessert gourmand.
                </p>
              </div>
              <div className="relative min-h-[30rem] w-full grow">
                <img
                  className="size-full object-cover object-center"
                  src="./images/product/eclat_chocolat.jpg"
                  alt="Éclair au chocolat"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-r-[2rem]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
