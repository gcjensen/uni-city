'use strict';

const fs  = require('fs');
const GooglePlaces = require('node-googleplaces');

let key;
readInKey();

const getDataForCity = (city) => {

  return new Promise((resolve, reject) => {

      /*
     const places = new GooglePlaces(key);
     const params = {
       query: `nightclub in ${city}`
     };

     places.textSearch(params, (err, response) => {
         console.log(response.body.results);
     });
     */

    // const places = new GooglePlaces(key);
    // const params = {
    //   query: `nightclub in ${city}`
    // };
    // places.textSearch(params, (err, response) => {
    //   const topClubs = getTopClubs(response, 4);
    //   const averageRating = computeAverageRating(response);
    //   resolve({ topClubs, rating: averageRating });
    // });

    /*
     * the above is commented out to avoid exceeding Google API Limits.
     * For testing, a random number between 6.0 and 9.0 is generated
     */
    const topClubs = getTopClubs();
    resolve({ topClubs, rating: (Math.floor(Math.random() * 15) + 30)/ 5})
  });
};

module.exports.getDataForCity = getDataForCity;

function computeAverageRating(response) {
  let ratings = response.body.results.map((r) => r.rating);
  ratings = ratings.filter((r) => !isNaN(r));
  let totalRating = ratings.reduce((a, b) => a + b, 0);
  let averageRating = (totalRating / ratings.length) * 2;
  return Math.round(averageRating * 100) / 100;
}

function getTopClubs(response = dummyResponse, numberRequired = 4) {
  let clubs = response.body.results;
  let topClubs = clubs.sort((a, b) => b.rating - a.rating).slice(0, numberRequired);
  return topClubs;
}

function readInKey() {
  fs.readFile('./server/config/google-places-api-key.txt', (err, data) => {
      if (err) throw err;
      key = data.toString();
  });
}


const dummyResponse = {
    body: {
        results: [
          { formatted_address: '55 London Rd, Southampton SO15 2AD, United Kingdom',
           geometry: { location: [Object], viewport: [Object] },
           icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png',
           id: '2fa488d96040fd22f2b0e5d638a14d584975db51',
           name: 'Junk',
           opening_hours: { open_now: false, weekday_text: [] },
           photos: [ [Object] ],
           place_id: 'ChIJJwaZca52dEgR8wUeemr-cBw',
           rating: 3.6,
           reference: 'CmRRAAAAdsJLY1RXrYEwhSXowFxevtA8y6liSrMsEjBzsgDBVTu59VLJY_Niq7E-a0wNkB2Ea2CoQTWgknYwVx5nFU8xqkkCQKzdx5m-JKGzVJX0s4atn3N-qiPLqQ4pieItr5UfEhDP9i5kdT0qC2DekEZJYke2GhTJ2cEfU2yqGNSteCXIxkxTqV54NQ',
           types: [ 'night_club', 'point_of_interest', 'establishment' ] },
          { formatted_address: 'Leisureworld, W Quay Rd, Southampton SO15 1RE, United Kingdom',
           geometry: { location: [Object], viewport: [Object] },
           icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png',
           id: 'ad7481bdaeb2a27e29c1235467a18bd6bb208dc1',
           name: 'Oceana',
           opening_hours: { open_now: false, weekday_text: [] },
           photos: [ [Object] ],
           place_id: 'ChIJ-YIFG7l2dEgRRUQ6kcgvXYY',
           rating: 3.2,
           reference: 'CmRSAAAAoqOMlh-0WJJXa-RtID1wuD1fRfAa-BqV9vdLxCzPLvLHy2k_KarXkG_GHMyall8H1JMyv5bQ4P3N7ber2fAapjptlZyImQb5sUYLym0bUDP1lZKc99MGZW__7vIavO1YEhBM-91tlBLTlv41iHsD0EOMGhR2MQyuHSHggouG53RoqEWFlL-Phg',
           types: [ 'night_club', 'bar', 'point_of_interest', 'establishment' ] },
          { formatted_address: '17 Upper Bannister St, Southampton SO15 2EH, United Kingdom',
           geometry: { location: [Object], viewport: [Object] },
           icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png',
           id: '5a2cb07d76570f19df3bf2f19f9cad2eb3f080f1',
           name: 'Popworld',
           opening_hours: { open_now: false, weekday_text: [] },
           photos: [ [Object] ],
           place_id: 'ChIJx8RmXq52dEgRuJKMB88999w',
           rating: 3.7,
           reference: 'CmRSAAAAnit9fg6Fl5KMpuuzkLxKVH-Yp_vPU0wBiqu209-q2TWLMhY-hmbSdsQKz4NnJj_MFRyXKzUgizSas0NLJ92sK4b2iThL4_I1cDRkv7bwtNMNAAOkyUQuhmRgbv_dvru4EhB7mf-4OHPHWwdryKPwKEY9GhS9N0mMrVoZ_Cpyzt9bXTqy_sZKRA',
           types: [ 'night_club', 'bar', 'point_of_interest', 'establishment' ] },
          { formatted_address: 'Compton Walk, Southampton SO14 0BH, United Kingdom',
           geometry: { location: [Object], viewport: [Object] },
           icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png',
           id: 'af8e95603bf90c9d367a99d0dd5d2c7559ab67ac',
           name: 'The Edge & The Box Bar',
           opening_hours: { open_now: true, weekday_text: [] },
           photos: [ [Object] ],
           place_id: 'ChIJFUromLJ2dEgRtx58ZtlZJFE',
           rating: 3.9,
           reference: 'CmRRAAAATyGziW3u0sLR6-bxn28Mx_yA-l8fvPyk6kjQrAdgjpdlZTbAo5z1hzJS9wD8T3xmffwfOn63XHEHXyQaXTBsluFtcsRghTxVVejaBiHy-bWG870tzr6Xda4jHlNnK7cUEhAAyfQ1g3HS5xbkeJLUAFl5GhQUMNEyZUMx8lkHgCegmBmhaLQB9Q',
           types: [ 'night_club', 'bar', 'point_of_interest', 'establishment' ] },
          { formatted_address: '194 Above Bar St, Southampton SO14, United Kingdom',
           geometry: { location: [Object], viewport: [Object] },
           icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png',
           id: '746bc35b12b4d74083f7cf1180dca03b5c00bd2e',
           name: 'Café Parfait',
           opening_hours: { open_now: true, weekday_text: [] },
           photos: [ [Object] ],
           place_id: 'ChIJNyKW7rF2dEgRjB0fKR--JdQ',
           rating: 3.6,
           reference: 'CmRSAAAA5AxwOueuQis7DUD-CvEdVC25NBe9Zuq7U46pjwXSUh1oa8X2vvzGmNkUyo6iiq3sXPv4SiBa5LldbowxpvsrRzvkM9U2oNCzACM0zWoERoO9w9kPNwcpBeEFUCnMXpEPEhCvb86gPJ36i1NhsyOn9s-OGhSEu5p-JuehI1-GLfOltm15MHq_lg',
           types: [ 'night_club', 'point_of_interest', 'establishment' ] },
          { formatted_address: '114-118 Bevois Valley Rd, Southampton SO14 0JZ, United Kingdom',
           geometry: { location: [Object], viewport: [Object] },
           icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png',
           id: 'd56bbde1d3fcc8835e06f44cd77ba579d8963335',
           name: 'Clowns Wine Bar and Jesters Nightclub',
           opening_hours: { open_now: true, weekday_text: [] },
           photos: [ [Object] ],
           place_id: 'ChIJZ3NaB1VxdEgRAl_Ui2UMLGM',
           rating: 4.3,
           reference: 'CmRRAAAAT3IQQRf9d_9KGSKtmzcBsHQ7GwIaL8SrHu49lGVgSPHF0CaTGs7EjqETm5p5U-3EnqBbcGxovuqwuaMAnnG3vMMZxbMsTiyrFfbHgycgHfQ1dHbF6QA2KGqBduchI_EhEhBMYF18abOxiJkVy0309d_uGhTpK1klLd3bzoKk4foJq17cfcxY2A',
           types:
           [ 'night_club',
            'bar',
            'food',
            'point_of_interest',
            'establishment' ] },
          { formatted_address: 'City Centre,, 35-41 London Rd, Southampton SO15 2AD, United Kingdom',
           geometry: { location: [Object], viewport: [Object] },
           icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png',
           id: '40879fe81239f6d383e865f9f6fae8c144bf9878',
           name: 'Kelly\'s Bar',
           opening_hours: { open_now: false, weekday_text: [] },
           photos: [ [Object] ],
           place_id: 'ChIJV9nWc652dEgReCg0YkTX9hI',
           rating: 3.9,
           reference: 'CmRRAAAAoJgE83l2F5qyLh2zQNbFfsE268arfp5i6fml8TciMNmxU7DNxv_rhD1s5It_f14jtA3zCZiSJGZY-dXLsUO4Wmba0IubstiRiguBBZjGYbPkVn_PZUxjCgzAA7BtFOymEhAVTPwCv8iSGKiJCKfqZd9gGhRAcWfrF_07KNTMaluV3yJJwNYanQ',
           types: [ 'night_club', 'bar', 'point_of_interest', 'establishment' ] },
          { formatted_address: '1-2 Vernon Walk, Southampton SO15 2EJ, United Kingdom',
           geometry: { location: [Object], viewport: [Object] },
           icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png',
           id: '855f4cfb6f05146b9293a15125c804b2ff4b99d0',
           name: 'Orange Rooms Southampton',
           opening_hours: { open_now: true, weekday_text: [] },
           photos: [ [Object] ],
           place_id: 'ChIJ-dT5Y652dEgRjw2q2BLiQGE',
           rating: 3.9,
           reference: 'CmRRAAAANufLNOx45jm3gG2rzZvcfusDuOJqQe-UPBWOw1JLCPoOAk-HEevA2q3K2wDy-blYaBaqEdvXocr-bQbhLHVKhUmoji7E7yQEOxQbp_T9jFiz_arrmbDCTo1qSL0hnZZHEhBzrcQ2kCHf2UJ2qFUuzExiGhTL7m9EB-Nx_Fj4WyLK4rah0WBfIQ',
           types:
           [ 'night_club',
            'bar',
            'restaurant',
            'food',
            'point_of_interest',
            'establishment' ] },
          { formatted_address: '16-22 The Polygon, Southampton SO15 2BN, United Kingdom',
           geometry: { location: [Object], viewport: [Object] },
           icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png',
           id: '6c0a7072b8de0e769af18f70f28235401c5ac788',
           name: 'The Talking Heads',
           opening_hours: { open_now: true, weekday_text: [] },
           photos: [ [Object] ],
           place_id: 'ChIJxSAmHuVzdEgRW0nokLM4EDI',
           rating: 4.2,
           reference: 'CmRRAAAAn-6QGsIYO9XDEmi1Tq67VBfycd-hKcuxS9-NAvVaYKYpFswfp-uKWa538KdEc0OuW5OTuJ0WiIAo5jAhGTkgy7aL-IIXILVsndPvwq42oi1dFRzL9rY_gSKgPwGcNHC4EhAItO-_1daKdJ-aPmWZMacsGhTL5XddUl12K0iCnxDOvRSw4ldCiw',
           types: [ 'night_club', 'point_of_interest', 'establishment' ] },
          { formatted_address: '3 Winchester St, Bedford Place, Southampton SO15 2EL, United Kingdom',
           geometry: { location: [Object], viewport: [Object] },
           icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png',
           id: '517efd0734e8d6554e22e284b6bed8fa11c220d0',
           name: 'Buddha Lounge',
           opening_hours: { open_now: true, weekday_text: [] },
           place_id: 'ChIJi0jjRa52dEgRqc84UfiMU1k',
           rating: 3.8,
           reference: 'CmRRAAAANrKr14DAbvcUHK4hZrxg26K_50sYn5uQMrcuxBs8RmknpC3QvYn9NgbCz_uBZAVCfIZvcihdzoktoPMKH2jpjzZTpkBUQm9tOsrIauqDP0ZjJSUsxwoH8fNXDa-6DHuYEhDyCswM1Fv3pdhSO51ANIk7GhR33vhfOTcqv4O62QQd4ofjd3shuA',
           types: [ 'bar', 'night_club', 'point_of_interest', 'establishment' ] },
          { formatted_address: '30 Bevois Valley Rd, Southampton SO14 0JR, United Kingdom',
           geometry: { location: [Object], viewport: [Object] },
           icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png',
           id: '81bee7edd264a84e0023eae20bdb23985b5a1bd2',
           name: 'The Dungeon',
           opening_hours: { open_now: true, weekday_text: [] },
           place_id: 'ChIJlyQZkVRxdEgRqR5tWOoL23M',
           rating: 4.1,
           reference: 'CmRRAAAAyHmvHCTRHpVaL7soRsZoByZ7KaB72jLtApN3YmbNaFXiFbYbK0xDStng7zzWjue7gOb_T7NZnHans5FRHvWS3Vme62-En1sQKvOdxEHtgqQEehb0XVG51X9z608odSOJEhB75X81A8ZKG9F4XBj_nfLaGhRRnISMf4tbZWvvLemGcTwl5srAYg',
           types: [ 'night_club', 'point_of_interest', 'establishment' ] },
          { formatted_address: '55 London Rd, Southampton, United Kingdom',
           geometry: { location: [Object], viewport: [Object] },
           icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png',
           id: '16116ea4449826defd55e5da7820e9f68a89dec5',
           name: 'TRiPP',
           opening_hours: { open_now: false, weekday_text: [] },
           place_id: 'ChIJu6VqeK52dEgRY9aJtK6iY-g',
           reference: 'CmRSAAAAtkLanCP7vv9DY2GvQM3kE2K1AvdwSwOCmSl8yiL5JJe5_A50TVuM6cpStJpasT1_p1ohNTC3Gq5e3WlBEa3qSHGYB1xIj8traRwvMjPrZ2k22guENq0WdbzD6bddSnExEhDJrFDnMgJ_DwNxdj-mDryVGhTSkwQ7HGyw5g7v-eHGKrSqFHDTRw',
           types: [ 'night_club', 'point_of_interest', 'establishment' ] },
          { formatted_address: '1 Carlton Pl, Southampton SO15 2EA, United Kingdom',
           geometry: { location: [Object], viewport: [Object] },
           icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png',
           id: 'e29fede7f42baba7de8d788c6f3a367dbb25247d',
           name: 'Seymour\'s',
           opening_hours: { open_now: true, weekday_text: [] },
           photos: [ [Object] ],
           place_id: 'ChIJC0lRgK52dEgRJSeVP0pTdtc',
           rating: 4.1,
           reference: 'CmRSAAAAqJ889ijWapCooEka75u0Rb6t7ugzFdUIMIiJeRt2MXYei7Z6pbO47ga3sD4v618aJXOoFTJtoqQwTXTwZ4QcUc6kEo24bVbd_JPD-4aAh-HWCzcEIw6I10msrHKsCpzjEhCWCwNv_7umwj2JUxnpK7aiGhR35veHN9ltm0OB5ObqnMO_p_oJQw',
           types:
           [ 'night_club',
            'bar',
            'food',
            'point_of_interest',
            'establishment' ] },
          { formatted_address: 'Southampton SO18 2NL, United Kingdom',
           geometry: { location: [Object], viewport: [Object] },
           icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png',
           id: 'f79ae4de207a453c45d4bc36510d38f7ac1dbee8',
           name: 'Priority Lounge',
           opening_hours: { open_now: true, weekday_text: [] },
           place_id: 'ChIJe0nQTbBzdEgRdo21dj0jc8k',
           rating: 3,
           reference: 'CmRSAAAAbLD6N_QDa3wBrW9tgHdZTVwxUtY1A9JaXQ8h5pelajXKWUGV5gdNj6_wsTGPm6FxyhxvVeg9VFM0FCJevYVrETv33U3ypBBareo62LG7s6YjmeAgzEikZvTnSh3jd0t7EhBYLeT4qhg6dqmIdRUQUvaNGhR7IrgwFZHTWdgXxdJwHvYMPXxJMg',
           types: [ 'night_club', 'bar', 'point_of_interest', 'establishment' ] },
          { formatted_address: 'AlexEntertainment, Southampton SO14 1AA, United Kingdom',
           geometry: { location: [Object], viewport: [Object] },
           icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png',
           id: 'e0ec495f28f498e8c7164b399059dc1624d9367e',
           name: 'AlexEntertainment Mobile Disco Southampton',
           place_id: 'ChIJDTN-Z0xxdEgR1tJywygg13A',
           reference: 'CmRRAAAAaOJiFySJ3MAfC9b5AfjcZBrX1LopEB-GZEl-m7YJFPW5ATHncBEGxRFXi2zy0mYhHCUmFgkBfjZc7OjayTPGK0xRS567POVT7NFU9IFO6JjlXayz6UWrGA3OYYEu7lxMEhC99W2E8dizLnWcBXnv78GHGhTAkBbL2QGmYvaI8OZ4zMa2FNnjYw',
           types: [ 'night_club', 'bar', 'point_of_interest', 'establishment' ] },
          { formatted_address: '125 Tuckahoe Ln, Southampton, NY 11968, United States',
           geometry: { location: [Object], viewport: [Object] },
           icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png',
           id: '2609bfe393503e0bf052100dd60463542558f24a',
           name: 'AM SOUTHAMPTON',
           opening_hours: { open_now: false, weekday_text: [] },
           photos: [ [Object] ],
           place_id: 'ChIJWwUQvqCU6IkRArqfRtJ9qsg',
           rating: 4.6,
           reference: 'CmRSAAAAtU9sxjfNU5zJv6dX5zYfamGEXpuvUib7fKr_O-0w0QBVEGleL-KZP8VEmbbCVJR63J-TjRMvmkN9Yxaakp04yPTeCCMFqZ-XnULE4qaQSASm7WdaIr6PBnZuT_Kij_sKEhBQJ1HapGUYKGjSjDvQp7gBGhTzXbuFPSt4Uy5S9AKalEwJ0cwFtQ',
           types: [ 'night_club', 'point_of_interest', 'establishment' ] },
          { formatted_address: '12 Tower Gardens, Southampton SO16 7EL, United Kingdom',
           geometry: { location: [Object], viewport: [Object] },
           icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png',
           id: '3f59e13cae713c01adf0da7a31422d7ef63ecad4',
           name: 'Southampton Jazz Club',
           place_id: 'ChIJE9ci3gx0dEgRDKx9kN3OkYM',
           reference: 'CmRSAAAAoYdkAhRyBrxk0erBl16qQxvMHBPsQw4bNmy_DJvY_KtiLqREwnsoH3xbCKGrmij9z7MwsUbcRJWtpUmvs3deVCZw9M0dXhII2CNwwJYsmblHmpwyR5UVhU3bbpiv_uxGEhBRQMsIa-WSY848UC9_ZLKwGhS1mlntZarPBsJfQ1gPN_jRyVwyGg',
           types: [ 'night_club', 'bar', 'point_of_interest', 'establishment' ] },
          { formatted_address: '22 Brunswick Square, Southampton SO14 3AR, United Kingdom',
           geometry: { location: [Object], viewport: [Object] },
           icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png',
           id: '77b6b1f1aa17149363742340ef8969b1a394efd4',
           name: 'Apocalypse Southampton',
           place_id: 'ChIJU3_8Zsp2dEgR9HeaOuWE2xU',
           reference: 'CmRRAAAA1pTMsWDqkEZnzywW6KpsszvHPFJrNTyrrqUbUYbWUVXJlxfyQCM529dkM0YvtjAIPpOiwZz7XmN_WoiMFMH6K-oWXpGRZ1wifofEQnR0O7skXcvSqIbkHQ4zf-pBHIE7EhAZlO-Qe2_qH5drFPGPrpYzGhT5XgUKrO5BJM92oU1nLHyKQBgjpg',
           types: [ 'night_club', 'point_of_interest', 'establishment' ] },
          { formatted_address: '66 Palm Rd, Southampton SO16 5HF, United Kingdom',
           geometry: { location: [Object], viewport: [Object] },
           icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png',
           id: '24a9ec1582c9325de0cf8cf9fc511869f53bbda0',
           name: 'Howl Your Heart Out Karaoke & Disco',
           photos: [ [Object] ],
           place_id: 'ChIJCTqBtjZ0dEgR5RNV0yKsbxw',
           rating: 5,
           reference: 'CmRRAAAAS0vQRRCBaROZiACCdHzUmif6aHV22kkvd7YxeGn1lYl7NCdhS3CfQgW131lUcb76xixCTvixQ4XEPyZD7qEnMfTbIvjMIZQMtMdBPXp5ef-s3JgNeOucJja0cEHdEFOHEhDxtpW_2biuF-EOi5bUE8bCGhScTE60zVzrVBdj9OnQrm1Hh1nn9A',
           types: [ 'night_club', 'bar', 'point_of_interest', 'establishment' ] },
          { formatted_address: '113-117 Above Bar St, Southampton SO14 7FH, United Kingdom',
           geometry: { location: [Object], viewport: [Object] },
           icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png',
           id: 'd32e898f68f373615c55d1f785cd291932ac6d6f',
           name: 'Yates\'s',
           opening_hours: { open_now: true, weekday_text: [] },
           photos: [ [Object] ],
           place_id: 'ChIJnSOHbLF2dEgRcdYCilxODaU',
           rating: 3.6,
           reference: 'CmRSAAAAA8AywjmnlWJyRhfA3dcW-675QdGEdK2BJXPUulmz0btG78pb9a4wwhYgHDkSBbm49kCAXZCSjS0KvX_2roXRzLzeu9YHd5fxzzzsrKLJ8tXNEA7F_Fk4hMLfXqM7WWh7EhDsnWzg1vytby-UxxEEnUXNGhQG_qZsTY2TqTo-dcZtr_G7crruPQ',
           types: [ 'night_club', 'bar', 'point_of_interest', 'establishment' ]
         }
       ]
     }
}
