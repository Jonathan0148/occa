let properties: Array<any> = [
    {
       id: 1,
        address: "18 Henry st",
        city: "No Olvidar Abrir y Cerrar su Turno",
        state: "MA",
        zip: "01742",
        price: "$975,000",
        title: "Apertura y Cierre de Turnos",
        bedrooms: 4, 
        bathrooms: 3,
        long: -71.11095,
        lat: 42.35663,
        picture: "assets/img/properties/house01.jpg",
        thumbnail: "assets/img/properties/house01sq.jpg",
        images: [
        	"assets/img/properties/house01.jpg",
        	"assets/img/properties/house03.jpg",
        	"assets/img/properties/house06.jpg",
        	"assets/img/properties/house08.jpg"
        ],
        tags: "suburban",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo dolor, aliquam ac lacinia quis.",
        label: "sale",
        turno: "turno",
        turnoC: "ST",
        period: "",
        square: 152,
        link: "/asistencia/empleados/",
        broker: {
            id: 1,
            name: "Caroline Seymor",
            title: "Senior Broker",
            picture: "assets/img/brokers/caroline_seymor.jpg"
        }
    },
    {
        id: 2,
        address: "24 Pearl st",
        city: "Contactos Operativos",
        state: "MA",
        zip: "02420",
        price: "$1,200,000",
        title: "Directorio Telefónico",
        bedrooms: 5,
        bathrooms: 4,
        long: -71.10869,
        lat: 42.359103,
        picture: "assets/img/properties/house02.jpg",
        link: "/directorio/",
        thumbnail: "assets/img/properties/house02sq.jpg",
        images: [
        	"assets/img/properties/house02.jpg",
        	"assets/img/properties/house05.jpg",
        	"assets/img/properties/house07.jpg",
        	"assets/img/properties/house09.jpg"
        ],
        tags: "colonial",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo dolor, aliquam ac lacinia quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo dolor, aliquam ac lacinia quis.",
        label: "sale",
        turno: "turno",
        turnoC: "ST",
        period: "",
        square: 380,
        broker: {
            id: 1,
            name: "Caroline Seymor",
            title: "Senior Broker",
            picture: "assets/img/brokers/caroline_seymor.jpg"
        }
    },
    {
        id: 3,
        address: "61 West Cedar st",
        city: "Funciones del Puesto",
        state: "MA",
        zip: "02420",
        price: "$1,500", //$825,000
        title: "Funciones",
        bedrooms: 5,
        bathrooms: 4,
        long: -71.070061,
        lat: 42.359986,
        link: "/funciones/",
        picture: "assets/img/properties/Funciones.jpg",
        thumbnail: "assets/img/properties/Funciones.jpg",
        images: [
        	"assets/img/properties/house03.jpg",
        	"assets/img/properties/house06.jpg",
        	"assets/img/properties/house09.jpg",
        	"assets/img/properties/house11.jpg"
        ],
        tags: "contemporary",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo dolor, aliquam ac lacinia quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo dolor, aliquam ac lacinia quis.",
        label: "turno",
        turno: "turno",
        turnoC: "",
        period: "week",
        square: 180,
        broker: {
            id: 2,
            name: "Michael Drukov",
            title: "Senior Broker",
            picture: "assets/img/brokers/michael_drukov.jpg"
        }
    },
    /*
    {
        id: 4,
        address: "61 West Cedar st",
        city: "Registrar Novedades del Servicio",
        state: "MA",
        zip: "02420",
        price: "$1,500", //$825,000
        title: "Minuta",
        bedrooms: 5,
        bathrooms: 4,
        long: -71.070061,
        lat: 42.359986,
        link: "/minutas/",
        picture: "assets/img/properties/house03.jpg",
        thumbnail: "assets/img/properties/house03sq.jpg",
        images: [
        	"assets/img/properties/house03.jpg",
        	"assets/img/properties/house06.jpg",
        	"assets/img/properties/house09.jpg",
        	"assets/img/properties/house11.jpg"
        ],
        tags: "contemporary",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo dolor, aliquam ac lacinia quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo dolor, aliquam ac lacinia quis.",
        label: "turno",
        turno: "turno",
        turnoC: "",
        period: "week",
        square: 180,
        broker: {
            id: 2,
            name: "Michael Drukov",
            title: "Senior Broker",
            picture: "assets/img/brokers/michael_drukov.jpg"
        }
    },
    */
    {
        id: 5,
        address: "32 Prince st",
        city: "Configuración de Puntos de Marcación",
        state: "MA",
        zip: "02420",
        price: "$8,000", //$930,000
        title: "Puntos de Marcación",
        bedrooms: 5,
        link: "/puntos/",
        bathrooms: 4,
        long: -71.110448,
        lat: 42.360642,
        picture: "assets/img/properties/house04.jpg",
        thumbnail: "assets/img/properties/house04sq.jpg",
        images: [
        	"assets/img/properties/house04.jpg",
        	"assets/img/properties/house08.jpg",
        	"assets/img/properties/house10.jpg",
        	"assets/img/properties/house12.jpg"
        ],
        tags: "victorian",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo dolor, aliquam ac lacinia quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo dolor, aliquam ac lacinia quis.",
        label: "turno",
        turno: "turno",
        turnoC: "",
        period: "month",
        square: 210,
        broker: {
            id: 3,
            name: "Jonathan Jones",
            title: "Senior Broker",
            picture: "assets/img/brokers/jonathan_jones.jpg"
        }
    },
    {
        id: 6,
        address: "32 Prince st",
        city: "Tickets Programados",
        state: "MA",
        zip: "02420",
        price: "$8,000", //$930,000
        title: "Ronda",
        bedrooms: 5,
        bathrooms: 4,
        link: "/rondas/",
        //link: "",
        long: -71.110448,
        lat: 42.360642,
        picture: "assets/img/properties/house05sq.jpg",
        thumbnail: "assets/img/properties/house05sq.jpg",
        images: [
        	"assets/img/properties/house04.jpg",
        	"assets/img/properties/house08.jpg",
        	"assets/img/properties/house10.jpg",
        	"assets/img/properties/house12.jpg"
        ],
        tags: "victorian",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo dolor, aliquam ac lacinia quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo dolor, aliquam ac lacinia quis.",
        label: "turno",
        turno: "turno",
        turnoC: "",
        period: "month",
        square: 210,
        broker: {
            id: 3,
            name: "Jonathan Jones",
            title: "Senior Broker",
            picture: "assets/img/brokers/jonathan_jones.jpg"
        }
    },

    {
        id: 7,
        address: "32 Prince st",
        city: "Recibir Precintos del C.C.O.",
        state: "MA",
        zip: "02420",
        price: "$8,000", //$930,000
        title: "Recibir Precintos",
        bedrooms: 5,
        bathrooms: 4,
        link: "/recibir/",
        //link: "",
        long: -71.110448,
        lat: 42.360642,
        picture: "assets/img/properties/house03sq.jpg",
        thumbnail: "assets/img/properties/house03sq.jpg",
        images: [
        	"assets/img/properties/house04.jpg",
        	"assets/img/properties/house08.jpg",
        	"assets/img/properties/house10.jpg",
        	"assets/img/properties/house12.jpg"
        ],
        tags: "victorian",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo dolor, aliquam ac lacinia quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo dolor, aliquam ac lacinia quis.",
        label: "rent",
        turno: "turno",
        turnoC: "",
        period: "month",
        square: 210,
        broker: {
            id: 3,
            name: "Jonathan Jones",
            title: "Senior Broker",
            picture: "assets/img/brokers/jonathan_jones.jpg"
        }
    },

    {
        id: 8,
        address: "32 Prince st",
        city: "Entregar Precintos C.C.O.",
        state: "MA",
        zip: "02420",
        price: "$8,000", //$930,000
        title: "Entregar Precintos",
        bedrooms: 5,
        bathrooms: 4,
        link: "/entregar/",
        //link: "",
        long: -71.110448,
        lat: 42.360642,
        picture: "assets/img/properties/Domotica.jpg",
        thumbnail: "assets/img/properties/Domotica.jpg",
        images: [
        	"assets/img/properties/house04.jpg",
        	"assets/img/properties/house08.jpg",
        	"assets/img/properties/house10.jpg",
        	"assets/img/properties/house12.jpg"
        ],
        tags: "victorian",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo dolor, aliquam ac lacinia quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo dolor, aliquam ac lacinia quis.",
        label: "rent",
        turno: "turno",
        turnoC: "",
        period: "month",
        square: 210,
        broker: {
            id: 3,
            name: "Jonathan Jones",
            title: "Senior Broker",
            picture: "assets/img/brokers/jonathan_jones.jpg"
        }
    },
/*
    {
        id: 7,
        address: "211 Charles Street",
        city: "Inventario de Productos",
        state: "MA",
        zip: "02420",
        price: "$2,000", //$850,000
        title: "Control de Inventarios",
        bedrooms: 3,
        bathrooms: 2,
        long: -71.084454,
        //link: "/asistencia/empleados/",
        link: "",
        lat: 42.368168,
        picture: "assets/img/properties/house05.jpg",
        thumbnail: "assets/img/properties/house05sq.jpg",
        images: [
        	"assets/img/properties/house05.jpg",
        	"assets/img/properties/house07.jpg",
        	"assets/img/properties/house09.jpg",
        	"assets/img/properties/house11.jpg"
        ],
        tags: "farm",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo dolor, aliquam ac lacinia quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo dolor, aliquam ac lacinia quis.",
        label: "rent",
        turno: "turno",
        turnoC: "",
        period: "week",
        square: 125,
        broker: {
            id: 4,
            name: "Rosario Rodriguez",
            title: "Senior Broker",
            picture: "assets/img/brokers/rosario_rodriguez.jpg"
        }
    },

    {
        id: 8,
        address: "32 Prince st",
        city: "Control de Dispositivos Centralizado",
        state: "MA",
        zip: "02420",
        price: "$8,000", //$930,000
        title: "Control de Dispositivos",
        bedrooms: 5,
        link: "/domotica/",
        bathrooms: 4,
        long: -71.110448,
        lat: 42.360642,
        picture: "assets/img/properties/Domotica.jpg",
        thumbnail: "assets/img/properties/Domotica.jpg",
        images: [
        	"assets/img/properties/house04.jpg",
        	"assets/img/properties/house08.jpg",
        	"assets/img/properties/house10.jpg",
        	"assets/img/properties/house12.jpg"
        ],
        tags: "victorian",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo dolor, aliquam ac lacinia quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo dolor, aliquam ac lacinia quis.",
        label: "",
        turno: "turno",
        turnoC: "",
        period: "month",
        square: 210,
        broker: {
            id: 3,
            name: "Jonathan Jones",
            title: "Senior Broker",
            picture: "assets/img/brokers/jonathan_jones.jpg"
        }
    },
    */

    {
        id: 9,
        address: "32 Prince st",
        city: "Información relevante para desempeñar sus funciones",
        state: "MA",
        zip: "02420",
        price: "$8,000", //$930,000
        title: "!Lo que usted debería conocer!",
        bedrooms: 5,
        link: "/capacitacion/",
        bathrooms: 4,
        long: -71.110448,
        lat: 42.360642,
        picture: "assets/img/properties/capacitacion.jpg",
        thumbnail: "assets/img/properties/capacitacion.jpg",
        images: [
        	"assets/img/properties/house04.jpg",
        	"assets/img/properties/house08.jpg",
        	"assets/img/properties/house10.jpg",
        	"assets/img/properties/house12.jpg"
        ],
        tags: "victorian",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo dolor, aliquam ac lacinia quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo dolor, aliquam ac lacinia quis.",
        label: "",
        turno: "turno",
        turnoC: "ST",
        period: "month",
        square: 210,
        broker: {
            id: 3,
            name: "Jonathan Jones",
            title: "Senior Broker",
            picture: "assets/img/brokers/jonathan_jones.jpg"
        }
    },


];

export default properties;
