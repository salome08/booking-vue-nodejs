import Vue from "vue";
import vueRouter from "vue-router";

Vue.use(vueRouter);

function loadView(view) {
  //   return () => import(`./${view}.vue`);
  return () => import(`./views/${view}.vue`);
}

const router = new vueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: loadView("HomePage")
    }
  ]
});
//       children: [
//         //routes
//         {
//           path: "/",
//           name: "home",
//           component: loadView("Home")
//         },
//         {
//           path: "/products",
//           name: "products",
//           component: loadView("ProductsPage")
//         },
//         {
//           path: "/parrainage",
//           name: "parrainage",
//           component: loadView("ParrainagePage")
//         },
//         // {
//         //   path: "/missions",
//         //   name: "missions",
//         //   component: loadView("MissionsPage")
//         // }
//         {
//           path: "/missionBadge",
//           name: "missionBadge",
//           component: loadView("MissionBadgePage")
//         },
//         {
//           path: "/notifications",
//           name: "notifications",
//           component: loadView("NotificationsPage")
//         },
//         {
//           path: "/users",
//           name: "users",
//           component: loadView("UsersPage")
//         },
//         {
//           path: "/animals",
//           name: "animals",
//           component: loadView("AnimalsPage")
//         },
//         {
//           path: "/infoShopHive",
//           name: "infoShopHive",
//           component: loadView("InfoShopHivePage")
//         },
//         {
//           path: "/hive",
//           name: "hive",
//           component: loadView("HivePage")
//         }
//       ]
//     },
//     {
//       path: "/connexion",
//       name: "connexion",
//       component: loadView("ConnexionPage")
//     },
//     {
//       path: "/about",
//       name: "about",
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: loadView("About")
//     }
//   ]
// });

export default router;
