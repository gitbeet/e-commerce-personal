/* eslint-disable @next/next/no-img-element */
import { useModal } from "../context/ModalContext";
import { useShoppingCart } from "../context/ShoppingCartContext";

const ShoppingCartNav = () => {
  const { shoppingCart } = useShoppingCart();
  const { toggleShoppingCartModal } = useModal();

  if (!shoppingCart) return <h1>loading...</h1>;
  return (
    <div
      onClick={toggleShoppingCartModal}
      className="relative cursor-pointer hover-hover:hover:text-primary-600 transition-all"
    >
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="40px"
        height="40px"
        viewBox="0 0 506.000000 413.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,413.000000) scale(0.100000,-0.100000)"
          fill="currentColor"
          stroke="none"
        >
          <path
            d="M335 4026 c-84 -36 -124 -136 -87 -217 43 -96 79 -108 340 -109 153
0 204 -3 207 -12 2 -7 71 -240 154 -518 82 -278 222 -747 310 -1042 l160 -538
-29 -62 c-64 -138 -77 -290 -33 -388 56 -126 208 -202 408 -203 50 0 232 12
405 26 564 48 918 68 1280 73 213 3 366 10 383 16 46 18 77 63 77 114 0 54
-19 94 -57 120 -24 16 -51 19 -203 22 -303 6 -1003 -33 -1695 -94 -311 -28
-384 -4 -355 118 11 45 13 47 53 52 23 3 116 15 207 26 267 32 1557 188 1784
215 114 14 221 32 236 40 31 16 76 66 84 92 5 18 48 239 211 1084 76 393 85
451 76 486 -14 50 -43 88 -84 111 -30 16 -130 17 -1493 20 l-1461 2 -23 78
c-83 287 -126 418 -147 442 -48 58 -64 60 -385 60 -219 -1 -301 -4 -323 -14z
m1815 -1176 l0 -270 -339 0 -339 0 -11 45 c-6 25 -41 143 -76 262 -36 119 -65
220 -65 225 0 4 187 8 415 8 l415 0 0 -270z m850 0 l0 -270 -345 0 -345 0 0
270 0 270 345 0 345 0 0 -270z m880 257 c0 -13 -83 -451 -95 -504 l-5 -23
-310 0 -310 0 0 270 0 270 360 0 c294 0 360 -2 360 -13z m-1732 -1004 l-3
-318 -170 -22 c-93 -12 -188 -23 -209 -25 l-39 -2 -98 329 c-54 182 -99 336
-99 343 0 9 69 12 310 12 l310 0 -2 -317z m850 50 l2 -263 -22 -5 c-13 -2
-158 -20 -323 -40 -165 -19 -310 -37 -322 -39 l-23 -3 0 309 0 308 343 -2 342
-3 3 -262z m748 250 c-2 -10 -22 -110 -43 -222 -32 -174 -41 -205 -58 -212
-17 -7 -437 -60 -472 -59 -10 0 -13 58 -13 255 l0 255 296 0 c276 0 295 -1
290 -17z"
          />
          <path
            d="M1463 779 c-70 -27 -145 -100 -179 -173 -34 -74 -38 -174 -10 -254
24 -70 100 -153 174 -189 49 -24 69 -28 142 -28 102 0 155 21 228 89 119 112
141 294 50 430 -37 56 -104 109 -167 131 -63 21 -174 19 -238 -6z"
          />
          <path
            d="M3410 791 c-138 -42 -240 -178 -240 -320 0 -134 65 -240 185 -301 61
-31 76 -35 149 -35 137 0 239 62 298 183 29 60 33 76 33 152 0 73 -4 93 -28
142 -35 71 -110 140 -183 167 -56 22 -163 27 -214 12z"
          />
        </g>
      </svg>
      <div className=" absolute flex items-center justify-center rounded-full  bg-primary-550 text-neutral-900 font-semibold w-6 h-6 top-[1.4rem] left-[1.3rem]">
        {shoppingCart.length}
      </div>
    </div>
  );
};

export default ShoppingCartNav;
