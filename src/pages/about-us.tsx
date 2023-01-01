import Image from "next/image";
import Header from "../components/Header";

const people = [
  {
    name: "Ivan Leo",
    role: "Developer",
    imageUrl:
      "https://pbs.twimg.com/profile_images/1524186822389026816/sWRHRIkY_400x400.jpg",
    bio: "I build cool stuff from time to time, fixed up this website. Exploring an interest in Smart Contract Auditing",
    twitterUrl: "https://twitter.com/ivanleomk",
  },
  {
    name: "Gen Doo",
    role: "xx",
    imageUrl:
      "https://static.wixstatic.com/media/4f1588_51f5fb8ce8ad478ca0757cbbb2ddf968~mv2.jpeg/v1/crop/x_221,y_267,w_444,h_445/fill/w_400,h_400,al_c,q_95,usm_0.66_1.00_0.01,enc_auto/photo1663572387.jpeg",
    bio: "bio goes here",
    twitterUrl: "https://twitter.com/genedoo",
  },
  {
    name: "Gen Doo",
    role: "xx",
    imageUrl:
      "https://static.wixstatic.com/media/4f1588_3bb041c561154c3daf337a1f2c111d6d~mv2.jpeg/v1/crop/x_78,y_439,w_413,h_413/fill/w_400,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/photo1663572193.jpeg",
    bio: "bio goes here",
    twitterUrl: "https://twitter.com/0xtraderjones",
  },
];

export default function AboutUs() {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="bg-white">
          <div className="mx-auto max-w-7xl  px-4 sm:px-6 lg:px-8 lg:py-24">
            <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
              <div className="space-y-5 sm:space-y-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Our Team
                </h2>
                <p className="text-xl text-gray-500">
                  Meet the people behind Web3meets
                </p>
              </div>
              <div className="lg:col-span-2">
                <ul
                  role="list"
                  className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8"
                >
                  {people.map((person) => (
                    <li key={person.name}>
                      <div className="space-y-4">
                        <div className="aspect-w-3 aspect-h-2">
                          <img
                            className="rounded-lg object-cover shadow-lg"
                            src={person.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="space-y-1 text-lg font-medium leading-6">
                          <h3>{person.name}</h3>
                          <p className="text-indigo-600">{person.role}</p>
                        </div>
                        <div className="text-lg">
                          <p className="text-gray-500">{person.bio}</p>
                        </div>

                        <ul role="list" className="flex space-x-5">
                          <li>
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={person.twitterUrl}
                              className="text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Twitter</span>
                              <svg
                                className="h-5 w-5"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                              </svg>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
