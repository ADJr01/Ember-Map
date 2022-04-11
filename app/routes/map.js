import Route from '@ember/routing/route';

const load_list = {
  district: '/map.config/Bangladesh/districts.json',
  upazila: '/map.config/Bangladesh/upazilas.json',
  dhakaArea: '/map.config/Bangladesh/Dhaka.area/dhaka.metro.json',
};
async function parser() {
  const loadDistrict = new Promise(async (resolve, reject) => {
    try {
      const request = await fetch(load_list.district);
      const data = await request.json();
      resolve(data[2].data);
    } catch (e) {
      console.error(`District Loader Error ${e.message}`);
      reject([]);
    }
  });

  const loadUpzilas = new Promise(async (resolve, reject) => {
    try {
      const request = await fetch(load_list.upazila);
      const data = await request.json();
      resolve(data[2].data);
    } catch (e) {
      console.error(`Upazila Loader Error ${e.message}`);
      reject([]);
    }
  });

  const loadAreaDhaka = new Promise(async (resolve, reject) => {
    try {
      const request = await fetch(load_list.dhakaArea);
      const data = await request.json();
      resolve(data[2].data);
    } catch (e) {
      console.error(`Dhaka Area Loader Error ${e.message}`);
      reject([]);
    }
  });

  const loadAll = () =>
    new Promise(async (resolve, reject) => {
      try {
        Promise.all([loadDistrict, loadUpzilas, loadAreaDhaka]).then(
          (values) => {
            resolve(values);
          }
        );
      } catch (e) {
        console.error(`Parse Failed To Parse Due For \" ${e.message}\"`);
        reject(e.message);
      }
    });

  return loadAll();
}

export default class MapRoute extends Route {
  async model() {
    const data = await parser();
    return data;
  }
}
