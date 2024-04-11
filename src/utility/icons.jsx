
const icon = {
    close: {
        path: <path
            d="M400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z"></path>,
        viewbox: "112 112 288 288",
    },
    menu: {
        path: <path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="48"
                    d="M88 152h336M88 256h336M88 360h336"></path>,
        viewbox: "64 128 384 256",
    },
    forward: {
        path: <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48"
                    d="m268 112 144 144-144 144m124-144H100"></path>,
        viewbox: "76 88 360 336",
    },
    backward: {
        path: <path fill="none" strokeLinecap="round" stroke-linejoin="round" stroke-width="48" d="M244 400 100 256l144-144M120 256h292"></path>,
        viewbox: "76 88 360 336",
    },
    trash: {
        path: <>
            <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"
                  d="m112 112 20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320"></path>
            <path strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M80 112h352"></path>
            <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"
                  d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40m-64 64v224m-72-224 8 224m136-224-8 224"></path>
        </>,
        viewbox: "64 32 384 448",
    },
    moon: {
        path: <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"
                    d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z"></path>,
        viewbox: "32 32 448 448",
    },
    sun: {
        path: <>
            <path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32"
                  d="M256 48v48m0 320v48m147.08-355.08-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48m-320 0H48m355.08 147.08-33.94-33.94M142.86 142.86l-33.94-33.94"></path>
            <circle cx="256" cy="256" r="80" fill="none" strokeLinecap="round" strokeMiterlimit="10"
                    strokeWidth="32"></circle>
        </>,
        viewbox: "32 32 448 448",
    },
    arrowShortBack: {
        path: <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48"
                    d="M328 112 184 256l144 144"></path>,
        viewbox: "160 88 192 336",
    },

}

export default icon;