import { useMutation } from "@tanstack/react-query";
import { useFirestore } from "./use-firestore";
import { Collections } from "@/constants";

const DEFAULT_AVATARS = [
  {
    name: "Clifford",
    gender: "male",
    age: "young adult",
    ethnicity: "african american",
    image: [
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748819951/avatar/man/hxaft5qef8lgfkzcpi40.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748820181/avatar/man/mwjzzciikmhxl4b5crdx.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748820254/avatar/man/dhzfkzme4yubpakliaze.jpg",
    ],
    avi: "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748820181/avatar/man/mwjzzciikmhxl4b5crdx.jpg",
  },
  {
    name: "Abel",
    gender: "male",
    age: "young adult",
    ethnicity: "african american",
    image: [
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748820435/avatar/man/i0enejkhhhlgletbll8q.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748820437/avatar/man/qs6h4vwc1okzdrlspsfj.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748820436/avatar/man/huakqsqumsdt94wrypcp.jpg",
    ],
    avi: "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748820437/avatar/man/qs6h4vwc1okzdrlspsfj.jpg",
  },
  {
    name: "Jimmy",
    gender: "male",
    age: "young adult",
    ethnicity: "white",
    image: [
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748820580/avatar/man/c9rouqcd1dyuzm2sd13z.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748820582/avatar/man/gayvszkyflsuir9qeokf.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748820580/avatar/man/pe3xkgdsptatipb9lnr5.jpg",
    ],
    avi: "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748820582/avatar/man/gayvszkyflsuir9qeokf.jpg",
  },
  {
    name: "Ricky",
    gender: "male",
    age: "young adult",
    ethnicity: "white",
    image: [
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748820729/avatar/man/x6crbuzeolzsplw4wve6.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748820729/avatar/man/xk70c9oigml8zehtrlin.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748820729/avatar/man/gz8drr0tg8agmshjlk7z.jpg",
    ],
    avi: "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748820729/avatar/man/xk70c9oigml8zehtrlin.jpg",
  },
  {
    name: "Leon",
    gender: "male",
    age: "young adult",
    ethnicity: "white",
    image: [
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748820832/avatar/man/fwlqhdcifyytmomlawfh.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748820832/avatar/man/m3m71gttkafgxk3f98p3.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748820832/avatar/man/yxs3lqs5lifj7ablhsen.jpg",
    ],
    avi: "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748820832/avatar/man/m3m71gttkafgxk3f98p3.jpg",
  },
  {
    name: "Ross",
    gender: "male",
    age: "young adult",
    ethnicity: "white",
    image: [
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821173/avatar/man/lwmruopgu0gu3wgwynwq.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821173/avatar/man/jje7agsofcaoqrfnrohm.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821173/avatar/man/iygr4myn3xpmdlgzjmz6.jpg",
    ],
    avi: "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821173/avatar/man/jje7agsofcaoqrfnrohm.jpg",
  },
  {
    name: "Kevin",
    gender: "male",
    age: "young adult",
    ethnicity: "african american",
    image: [
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821458/avatar/man/goawcbsnedwziwqttd9l.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821458/avatar/man/pkdu5dqqroeblqf2hdek.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821460/avatar/man/wjg093sgltcqrtwmyy3t.jpg",
    ],
    avi: "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821458/avatar/man/pkdu5dqqroeblqf2hdek.jpg",
  },
  {
    name: "Cheng",
    gender: "male",
    age: "young adult",
    ethnicity: "asian",
    image: [
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821595/avatar/man/ecb2fkz6ygffeemafho9.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821591/avatar/man/s52lppansxijjvetjpoo.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821593/avatar/man/hvemktitx7wzzvpp9eoj.jpg",
    ],
    avi: "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821591/avatar/man/s52lppansxijjvetjpoo.jpg",
  },
  {
    name: "Frank",
    gender: "male",
    age: "young adult",
    ethnicity: "white",
    image: [
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821704/avatar/man/ydwurmsbth3ammqdym7y.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821707/avatar/man/r40ia1uhjwniov9rwflg.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821705/avatar/man/vdyljvnxvmrgxm3cyxgq.jpg",
    ],
    avi: "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821707/avatar/man/r40ia1uhjwniov9rwflg.jpg",
  },
  {
    name: "Gerald",
    gender: "male",
    age: "young adult",
    ethnicity: "white",
    image: [
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821833/avatar/man/mwmvmg4xcctcamvyjl4b.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821822/avatar/man/c4ac6f1f8gn4yhuauwvb.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821820/avatar/man/ggqfidvxistg2pavxttu.jpg",
    ],
    avi: "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821822/avatar/man/c4ac6f1f8gn4yhuauwvb.jpg",
  },
  {
    name: "Ginny",
    gender: "female",
    age: "young adult",
    ethnicity: "african american",
    image: [
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821990/avatar/woman/xsa4v3ugazweyywcsm8b.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821992/avatar/woman/vbviez5przgpvmrvt7mm.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821988/avatar/woman/ntrirk6lv9uanqedvpgq.jpg",
    ],
    avi: "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821992/avatar/woman/vbviez5przgpvmrvt7mm.jpg",
  },
  {
    name: "Georgia",
    gender: "female",
    age: "young adult",
    ethnicity: "white",
    image: [
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748822092/avatar/woman/yvob3pzezj3xxzrguzly.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748822095/avatar/woman/vdylf4tm4lapqp1sg8xw.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821988/avatar/woman/lhrdhtjs55jy8jwwzrtj.jpg",
    ],
    avi: "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748822095/avatar/woman/vdylf4tm4lapqp1sg8xw.jpg",
  },
  {
    name: "Sabrina",
    gender: "female",
    age: "young adult",
    ethnicity: "white",
    image: [
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748822092/avatar/woman/blzwhikrk1yoaj2elkos.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748822095/avatar/woman/oozdhskqsy1aeaj7aeqj.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821988/avatar/woman/kkhyeuzwhrygkpih77lv.jpg",
    ],
    avi: "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748822095/avatar/woman/oozdhskqsy1aeaj7aeqj.jpg",
  },
  {
    name: "Violet",
    gender: "female",
    age: "young adult",
    ethnicity: "african american",
    image: [
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748822092/avatar/woman/yefmatpmnbdbgf2afyy8.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748822095/avatar/woman/wbn9srehdqlijg0ywxvd.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821988/avatar/woman/dameooqmjod1afz3j4ty.jpg",
    ],
    avi: "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748822095/avatar/woman/wbn9srehdqlijg0ywxvd.jpg",
  },
  {
    name: "Hana",
    gender: "female",
    age: "young adult",
    ethnicity: "asian",
    image: [
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748822092/avatar/woman/et1evoxwee1x3deznplr.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748822095/avatar/woman/fof6eowywiyse6iubjtz.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821988/avatar/woman/xlmlfeglogl8twuptk8w.jpg",
    ],
    avi: "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748822095/avatar/woman/fof6eowywiyse6iubjtz.jpg",
  },
  {
    name: "Becky",
    gender: "female",
    age: "young adult",
    ethnicity: "african american",
    image: [
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748822092/avatar/woman/cwqjitawcogidu9bwovm.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748822095/avatar/woman/gz4fjdmxiw42qjnzrmwc.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821988/avatar/woman/kuikmjmde4ftmuuswjkv.jpg",
    ],
    avi: "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748822095/avatar/woman/gz4fjdmxiw42qjnzrmwc.jpg",
  },
  {
    name: "Akira",
    gender: "female",
    age: "young adult",
    ethnicity: "asian",
    image: [
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748822092/avatar/woman/ix1bxuex1nqwdy1z84uu.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748822095/avatar/woman/kl1sgqafrllb3mp0owru.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821988/avatar/woman/yukxd7n7ip9zdpmqjanh.jpg",
    ],
    avi: "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748822095/avatar/woman/kl1sgqafrllb3mp0owru.jpg",
  },
  {
    name: "Victoria",
    gender: "female",
    age: "young adult",
    ethnicity: "white",
    image: [
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748822092/avatar/woman/uokkyurbxpgqeki8lglz.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748822095/avatar/woman/epkm7hgacy7ezrmyprmu.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821988/avatar/woman/twsi0pxa0an0uej8tdvf.jpg",
    ],
    avi: "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748822095/avatar/woman/epkm7hgacy7ezrmyprmu.jpg",
  },
  {
    name: "Bridget",
    gender: "female",
    age: "young adult",
    ethnicity: "white",
    image: [
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748822092/avatar/woman/m0hnaoethljdt6bcq0uy.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748822095/avatar/woman/loxhjw3bnwy480ow8xnt.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821988/avatar/woman/hh4iuhs35abhq29eiiiy.jpg",
    ],
    avi: "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748822095/avatar/woman/loxhjw3bnwy480ow8xnt.jpg",
  },
  {
    name: "Sophia",
    gender: "female",
    age: "young adult",
    ethnicity: "african american",
    image: [
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748822092/avatar/woman/urhpxphsyrwapvnystqs.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748822095/avatar/woman/se71l6u4wth7lj7qscjb.jpg",
      "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821988/avatar/woman/ubmi6yusdq7cz1yijrkt.jpg",
    ],
    avi: "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748822095/avatar/woman/se71l6u4wth7lj7qscjb.jpg",
  },
];

export const useAddDefaultAvatars = () => {
  const { addDocument } = useFirestore();

  return useMutation({
    mutationFn: async () => {
      DEFAULT_AVATARS.forEach(async (avatar) => {
        const ref = await addDocument(Collections.defaultAvatars, avatar);
      });
    },
  });
};
