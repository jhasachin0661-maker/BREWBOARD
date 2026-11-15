import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/images');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const svgs = {
  'espresso.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2D231E"/>
        <stop offset="100%" stop-color="#191310"/>
      </linearGradient>
      <linearGradient id="crema" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#D79E66"/>
        <stop offset="40%" stop-color="#A56336"/>
        <stop offset="100%" stop-color="#3D2115"/>
      </linearGradient>
      <linearGradient id="cupGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FBF7F0"/>
        <stop offset="100%" stop-color="#D9CCBA"/>
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#000000" flood-opacity="0.4"/>
      </filter>
    </defs>
    <rect width="600" height="450" fill="url(#bg)"/>
    <ellipse cx="300" cy="380" rx="190" ry="25" fill="#0E0B0A" opacity="0.6"/>
    <!-- Saucer -->
    <ellipse cx="300" cy="340" rx="150" ry="24" fill="url(#cupGrad)" filter="url(#shadow)"/>
    <ellipse cx="300" cy="338" rx="130" ry="18" fill="#ECE0D1"/>
    <ellipse cx="300" cy="337" rx="80" ry="10" fill="#D4C3AF"/>
    <!-- Cup Body -->
    <path d="M210 210 C210 320 230 335 300 335 C370 335 390 320 390 210 Z" fill="url(#cupGrad)" filter="url(#shadow)"/>
    <!-- Handle -->
    <path d="M375 235 C425 240 435 290 375 305" fill="none" stroke="#ECE0D1" stroke-width="18" stroke-linecap="round"/>
    <path d="M375 235 C425 240 435 290 375 305" fill="none" stroke="#D9CCBA" stroke-width="12" stroke-linecap="round"/>
    <!-- Cup Rim & Coffee Crema -->
    <ellipse cx="300" cy="210" rx="90" ry="24" fill="#FAF5ED"/>
    <ellipse cx="300" cy="212" rx="82" ry="20" fill="url(#crema)"/>
    <!-- Crema marbling -->
    <ellipse cx="280" cy="210" rx="45" ry="10" fill="#E2AC76" opacity="0.7"/>
    <path d="M250 212 Q280 205 315 214 Q340 211 350 214" stroke="#FFE3B8" stroke-width="3" fill="none" opacity="0.6" stroke-linecap="round"/>
    <!-- Steam -->
    <path d="M280 170 Q270 140 285 110 Q295 90 285 70" stroke="#F4EBDD" stroke-width="3" fill="none" opacity="0.3" stroke-linecap="round"/>
    <path d="M315 165 Q330 135 315 105 Q305 85 320 60" stroke="#F4EBDD" stroke-width="2.5" fill="none" opacity="0.25" stroke-linecap="round"/>
    <!-- Badge tag -->
    <rect x="40" y="380" rx="14" width="110" height="28" fill="#C47B4D" opacity="0.9"/>
    <text x="95" y="398" fill="#FFF" font-family="'Space Grotesk', sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="1">HOT • ESPRESSO</text>
  </svg>`,

  'caramel-macchiato.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
    <defs>
      <linearGradient id="bgMac" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#34251D"/>
        <stop offset="100%" stop-color="#1A120E"/>
      </linearGradient>
      <linearGradient id="milkLayer" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFFDF9"/>
        <stop offset="100%" stop-color="#F2E4D2"/>
      </linearGradient>
      <linearGradient id="espressoLayer" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#462413"/>
        <stop offset="100%" stop-color="#7B4222"/>
      </linearGradient>
    </defs>
    <rect width="600" height="450" fill="url(#bgMac)"/>
    <ellipse cx="300" cy="390" rx="160" ry="20" fill="#0A0806" opacity="0.5"/>
    <!-- Tall Glass Cup -->
    <path d="M225 150 L245 365 C246 375 255 380 270 380 L330 380 C345 380 354 375 355 365 L375 150 Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.4)" stroke-width="3"/>
    <!-- Bottom Milk Layer -->
    <path d="M243 365 L240 290 Q300 295 360 290 L357 365 C354 374 345 378 330 378 L270 378 C255 378 245 374 243 365 Z" fill="url(#milkLayer)"/>
    <!-- Middle Espresso Layer -->
    <path d="M239 292 L233 220 Q300 225 367 220 L361 292 Q300 296 239 292 Z" fill="url(#espressoLayer)"/>
    <!-- Top Foamed Milk Crown -->
    <ellipse cx="300" cy="150" rx="76" ry="18" fill="#FCF9F2"/>
    <path d="M225 150 Q300 162 375 150 L370 190 Q300 200 230 190 Z" fill="#F7EEDD"/>
    <!-- Caramel Cross-Hatch Drizzle -->
    <path d="M245 145 C270 155 320 142 355 152" stroke="#C47B4D" stroke-width="5" stroke-linecap="round" fill="none"/>
    <path d="M255 155 C285 145 325 158 350 146" stroke="#D97736" stroke-width="4.5" stroke-linecap="round" fill="none"/>
    <path d="M270 140 C280 160 320 160 330 142" stroke="#A75A28" stroke-width="4" stroke-linecap="round" fill="none"/>
    <!-- Glass Highlights -->
    <path d="M233 160 L249 350" stroke="rgba(255,255,255,0.5)" stroke-width="3" stroke-linecap="round"/>
    <rect x="40" y="380" rx="14" width="130" height="28" fill="#C47B4D" opacity="0.9"/>
    <text x="105" y="398" fill="#FFF" font-family="'Space Grotesk', sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="1">HOT • CARAMEL</text>
  </svg>`,

  'cappuccino.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
    <defs>
      <linearGradient id="bgCap" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2C201A"/>
        <stop offset="100%" stop-color="#16100D"/>
      </linearGradient>
      <linearGradient id="ceramic" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#75513D"/>
        <stop offset="100%" stop-color="#4B3122"/>
      </linearGradient>
    </defs>
    <rect width="600" height="450" fill="url(#bgCap)"/>
    <ellipse cx="300" cy="385" rx="180" ry="24" fill="#0C0806" opacity="0.6"/>
    <!-- Saucer -->
    <ellipse cx="300" cy="350" rx="160" ry="25" fill="#E8DCB8"/>
    <ellipse cx="300" cy="348" rx="140" ry="20" fill="#FAF5ED"/>
    <!-- Wide Cup -->
    <path d="M190 230 C190 345 225 350 300 350 C375 350 410 345 410 230 Z" fill="url(#ceramic)"/>
    <!-- Handle -->
    <path d="M395 245 C450 255 455 315 390 325" fill="none" stroke="#5D3F2E" stroke-width="16" stroke-linecap="round"/>
    <!-- Milk Foam Dome -->
    <ellipse cx="300" cy="230" rx="110" ry="32" fill="#422517"/>
    <ellipse cx="300" cy="225" rx="100" ry="28" fill="#FFFBF5"/>
    <!-- Heart Latte Art -->
    <path d="M300 238 C280 220 260 210 275 195 C290 185 300 205 300 205 C300 205 310 185 325 195 C340 210 320 220 300 238 Z" fill="#B3784C"/>
    <ellipse cx="300" cy="215" rx="14" ry="10" fill="#FFFBF5"/>
    <!-- Cocoa Dusting sprinkles -->
    <circle cx="240" cy="220" r="2" fill="#5A341E"/>
    <circle cx="248" cy="230" r="1.5" fill="#5A341E"/>
    <circle cx="235" cy="235" r="2.5" fill="#5A341E"/>
    <circle cx="355" cy="225" r="2" fill="#5A341E"/>
    <circle cx="365" cy="218" r="1.5" fill="#5A341E"/>
    <!-- Badge -->
    <rect x="40" y="380" rx="14" width="130" height="28" fill="#89927A" opacity="0.9"/>
    <text x="105" y="398" fill="#FFF" font-family="'Space Grotesk', sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="1">HOT • MILK COFFEE</text>
  </svg>`,

  'latte.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
    <defs>
      <linearGradient id="bgLatte" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#30231C"/>
        <stop offset="100%" stop-color="#17110E"/>
      </linearGradient>
      <linearGradient id="latteBowl" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F4EBDD"/>
        <stop offset="100%" stop-color="#D6C4AD"/>
      </linearGradient>
    </defs>
    <rect width="600" height="450" fill="url(#bgLatte)"/>
    <ellipse cx="300" cy="385" rx="170" ry="22" fill="#0E0A08" opacity="0.5"/>
    <!-- Ceramic Saucer -->
    <ellipse cx="300" cy="345" rx="155" ry="24" fill="#FAF5ED"/>
    <ellipse cx="300" cy="342" rx="135" ry="18" fill="#E8DCB8"/>
    <!-- Wide Tulip Cup -->
    <path d="M195 210 C195 330 230 345 300 345 C370 345 405 330 405 210 Z" fill="url(#latteBowl)"/>
    <path d="M395 230 C445 240 445 295 390 305" fill="none" stroke="#D6C4AD" stroke-width="15" stroke-linecap="round"/>
    <!-- Rosette Foam Art -->
    <ellipse cx="300" cy="210" rx="105" ry="28" fill="#A86B3E"/>
    <ellipse cx="300" cy="210" rx="98" ry="24" fill="#FFFDF9"/>
    <!-- Rosetta Leaf pattern -->
    <path d="M300 230 L300 190" stroke="#9E5F34" stroke-width="3" stroke-linecap="round"/>
    <path d="M285 220 Q300 215 315 220" stroke="#9E5F34" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M280 210 Q300 205 320 210" stroke="#9E5F34" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M285 200 Q300 195 315 200" stroke="#9E5F34" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="300" cy="192" r="5" fill="#9E5F34"/>
    <rect x="40" y="380" rx="14" width="130" height="28" fill="#89927A" opacity="0.9"/>
    <text x="105" y="398" fill="#FFF" font-family="'Space Grotesk', sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="1">HOT • CAFÈ LATTE</text>
  </svg>`,

  'flat-white.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
    <defs>
      <linearGradient id="bgFW" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#28201B"/>
        <stop offset="100%" stop-color="#140F0D"/>
      </linearGradient>
      <linearGradient id="cupFW" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#4A5643"/>
        <stop offset="100%" stop-color="#2E3829"/>
      </linearGradient>
    </defs>
    <rect width="600" height="450" fill="url(#bgFW)"/>
    <ellipse cx="300" cy="380" rx="160" ry="22" fill="#0A0706" opacity="0.6"/>
    <!-- Saucer -->
    <ellipse cx="300" cy="340" rx="145" ry="22" fill="#606C57"/>
    <ellipse cx="300" cy="338" rx="125" ry="17" fill="#89927A"/>
    <!-- Matte Green Cup -->
    <path d="M210 220 C210 330 240 338 300 338 C360 338 390 330 390 220 Z" fill="url(#cupFW)"/>
    <path d="M380 235 C425 245 425 295 380 305" fill="none" stroke="#4A5643" stroke-width="14" stroke-linecap="round"/>
    <!-- Flat White Gloss Foam -->
    <ellipse cx="300" cy="220" rx="90" ry="25" fill="#8C522B"/>
    <ellipse cx="300" cy="220" rx="84" ry="22" fill="#FFF9F0"/>
    <!-- Single perfect dot feather art -->
    <circle cx="300" cy="216" r="16" fill="#C47B4D"/>
    <circle cx="300" cy="216" r="11" fill="#FFF9F0"/>
    <path d="M300 200 L300 235" stroke="#C47B4D" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="40" y="380" rx="14" width="130" height="28" fill="#89927A" opacity="0.9"/>
    <text x="105" y="398" fill="#FFF" font-family="'Space Grotesk', sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="1">HOT • FLAT WHITE</text>
  </svg>`,

  'mocha.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
    <defs>
      <linearGradient id="bgMocha" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#261A16"/>
        <stop offset="100%" stop-color="#120A07"/>
      </linearGradient>
      <linearGradient id="mugGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#3A2820"/>
        <stop offset="100%" stop-color="#211A17"/>
      </linearGradient>
    </defs>
    <rect width="600" height="450" fill="url(#bgMocha)"/>
    <ellipse cx="300" cy="385" rx="160" ry="20" fill="#080504" opacity="0.7"/>
    <!-- Heavy Ceramic Mug -->
    <path d="M215 180 L230 355 C232 368 250 375 300 375 C350 375 368 368 370 355 L385 180 Z" fill="url(#mugGrad)" stroke="#50433C" stroke-width="3"/>
    <path d="M380 205 C435 215 440 305 372 320" fill="none" stroke="#50433C" stroke-width="16" stroke-linecap="round"/>
    <!-- Swirled Whipped Cream -->
    <path d="M225 180 Q300 195 375 180 Q380 150 340 140 Q300 120 300 100 Q280 125 250 145 Q220 160 225 180 Z" fill="#FFFDF8"/>
    <!-- Chocolate Ganache Spiral -->
    <path d="M255 170 C280 160 330 165 350 175" stroke="#3D1D11" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M270 145 C295 135 320 142 335 150" stroke="#3D1D11" stroke-width="4" fill="none" stroke-linecap="round"/>
    <!-- Cocoa Flakes -->
    <rect x="280" y="130" width="8" height="4" rx="2" fill="#25120A" transform="rotate(25 280 130)"/>
    <rect x="315" y="140" width="10" height="4" rx="2" fill="#25120A" transform="rotate(-15 315 140)"/>
    <rect x="295" y="115" width="7" height="3" rx="1.5" fill="#25120A" transform="rotate(40 295 115)"/>
    <rect x="40" y="380" rx="14" width="125" height="28" fill="#75513D" opacity="0.9"/>
    <text x="102" y="398" fill="#FFF" font-family="'Space Grotesk', sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="1">HOT • CHOCOLATE</text>
  </svg>`,

  'cold-brew.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
    <defs>
      <linearGradient id="bgCB" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1E2429"/>
        <stop offset="100%" stop-color="#101518"/>
      </linearGradient>
      <linearGradient id="coldBrewLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#542E1B"/>
        <stop offset="60%" stop-color="#2D150A"/>
        <stop offset="100%" stop-color="#140803"/>
      </linearGradient>
    </defs>
    <rect width="600" height="450" fill="url(#bgCB)"/>
    <ellipse cx="300" cy="390" rx="150" ry="22" fill="#06090B" opacity="0.6"/>
    <!-- Heavy Base Rocks Glass -->
    <path d="M220 120 L238 360 C240 372 255 378 300 378 C345 378 360 372 362 360 L380 120 Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" stroke-width="2.5"/>
    <path d="M239 355 C242 365 255 372 300 372 C345 372 358 365 361 355 L356 325 C345 330 320 332 300 332 C280 332 255 330 244 325 Z" fill="rgba(255,255,255,0.2)"/>
    <!-- Cold Brew Liquid -->
    <path d="M228 160 L238 350 C242 360 258 365 300 365 C342 365 358 360 362 350 L372 160 Q300 172 228 160 Z" fill="url(#coldBrewLiquid)"/>
    <!-- Crystal Clear Giant Ice Cube -->
    <polygon points="265,160 335,150 345,220 275,230" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/>
    <polygon points="265,160 300,140 370,132 335,150" fill="rgba(255,255,255,0.35)"/>
    <polygon points="335,150 370,132 378,202 345,220" fill="rgba(255,255,255,0.15)"/>
    <!-- Condensation beads on glass -->
    <circle cx="236" cy="220" r="2.5" fill="rgba(255,255,255,0.6)"/>
    <circle cx="238" cy="240" r="1.8" fill="rgba(255,255,255,0.5)"/>
    <circle cx="237" cy="275" r="2.2" fill="rgba(255,255,255,0.7)"/>
    <circle cx="363" cy="205" r="2" fill="rgba(255,255,255,0.6)"/>
    <circle cx="361" cy="250" r="2.5" fill="rgba(255,255,255,0.5)"/>
    <rect x="40" y="380" rx="14" width="130" height="28" fill="#C47B4D" opacity="0.9"/>
    <text x="105" y="398" fill="#FFF" font-family="'Space Grotesk', sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="1">COLD • STEEPED</text>
  </svg>`,

  'iced-coffee.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
    <defs>
      <linearGradient id="bgIC" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#232726"/>
        <stop offset="100%" stop-color="#111312"/>
      </linearGradient>
    </defs>
    <rect width="600" height="450" fill="url(#bgIC)"/>
    <ellipse cx="300" cy="390" rx="150" ry="20" fill="#0A0A0A" opacity="0.6"/>
    <!-- Glass Tumbler -->
    <path d="M225 110 L242 360 C245 372 260 378 300 378 C340 378 355 372 358 360 L375 110 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.3)" stroke-width="2.5"/>
    <!-- Iced Americano Dark Amber Liquid -->
    <path d="M230 150 L242 355 C245 365 260 370 300 370 C340 370 355 365 358 355 L370 150 Q300 162 230 150 Z" fill="#381D10" opacity="0.92"/>
    <!-- Floating Ice Cubes -->
    <polygon points="255,160 295,150 305,190 265,200" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/>
    <polygon points="310,165 350,155 358,195 318,205" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/>
    <polygon points="280,210 325,200 332,245 287,255" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>
    <!-- Orange Twist Garnish -->
    <path d="M240 130 Q280 110 300 140 Q310 160 330 135" stroke="#E67E22" stroke-width="7" fill="none" stroke-linecap="round"/>
    <rect x="40" y="380" rx="14" width="130" height="28" fill="#C47B4D" opacity="0.9"/>
    <text x="105" y="398" fill="#FFF" font-family="'Space Grotesk', sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="1">COLD • AMERICANO</text>
  </svg>`,

  'affogato.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
    <defs>
      <linearGradient id="bgAff" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2E231F"/>
        <stop offset="100%" stop-color="#150E0B"/>
      </linearGradient>
    </defs>
    <rect width="600" height="450" fill="url(#bgAff)"/>
    <ellipse cx="300" cy="385" rx="160" ry="20" fill="#0A0605" opacity="0.6"/>
    <!-- Glass Footed Coupe -->
    <path d="M285 300 L285 365 L245 375 L355 375 L315 365 L315 300 Z" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
    <path d="M190 200 C190 290 260 300 300 300 C340 300 410 290 410 200 Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.4)" stroke-width="2.5"/>
    <!-- Vanilla Gelato Scoop -->
    <ellipse cx="300" cy="210" rx="65" ry="50" fill="#FFFBF0"/>
    <!-- Melting Hot Espresso Cascade -->
    <path d="M275 170 C285 185 270 215 280 235 C285 245 305 250 315 240 C325 230 315 195 325 180 Z" fill="#4B2211" opacity="0.85"/>
    <path d="M250 200 C255 220 265 235 270 250" stroke="#75513D" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M335 195 C330 215 332 235 328 255" stroke="#75513D" stroke-width="5" fill="none" stroke-linecap="round"/>
    <ellipse cx="300" cy="265" rx="75" ry="18" fill="#3D1A0D" opacity="0.7"/>
    <!-- Vanilla Specks -->
    <circle cx="290" cy="200" r="1.5" fill="#4B3A2F"/>
    <circle cx="310" cy="205" r="1.5" fill="#4B3A2F"/>
    <circle cx="325" cy="190" r="1.5" fill="#4B3A2F"/>
    <rect x="40" y="380" rx="14" width="130" height="28" fill="#C47B4D" opacity="0.9"/>
    <text x="105" y="398" fill="#FFF" font-family="'Space Grotesk', sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="1">COLD • SPECIALTY</text>
  </svg>`,

  'vietnamese-coffee.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
    <defs>
      <linearGradient id="bgVn" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2D2118"/>
        <stop offset="100%" stop-color="#140E0A"/>
      </linearGradient>
      <linearGradient id="metalPhin" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#E0E0E0"/>
        <stop offset="50%" stop-color="#FFFFFF"/>
        <stop offset="100%" stop-color="#B0B0B0"/>
      </linearGradient>
    </defs>
    <rect width="600" height="450" fill="url(#bgVn)"/>
    <ellipse cx="300" cy="400" rx="160" ry="20" fill="#0A0604" opacity="0.6"/>
    <!-- Glass Tumbler -->
    <path d="M235 180 L250 375 C252 382 260 388 300 388 C340 388 348 382 350 375 L365 180 Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.4)" stroke-width="2.5"/>
    <!-- Condensed Milk Bottom Layer -->
    <path d="M249 375 L247 330 Q300 335 353 330 L351 375 C348 382 340 386 300 386 C260 386 252 382 249 375 Z" fill="#FDF3CE"/>
    <!-- Dark Robusta Layer -->
    <path d="M246 328 L238 215 Q300 220 362 215 L354 328 Q300 333 246 328 Z" fill="#201007"/>
    <!-- Phin Metal Drip Filter on top -->
    <rect x="220" y="172" width="160" height="10" rx="4" fill="url(#metalPhin)"/>
    <rect x="245" y="105" width="110" height="70" rx="3" fill="url(#metalPhin)"/>
    <rect x="240" y="98" width="120" height="8" rx="3" fill="url(#metalPhin)"/>
    <!-- Phin Lid Knob -->
    <circle cx="300" cy="94" r="5" fill="#999"/>
    <!-- Drip drop -->
    <circle cx="300" cy="200" r="3.5" fill="#2B140A"/>
    <rect x="40" y="380" rx="14" width="130" height="28" fill="#C47B4D" opacity="0.9"/>
    <text x="105" y="398" fill="#FFF" font-family="'Space Grotesk', sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="1">COLD • TRADITIONAL</text>
  </svg>`,

  'turkish-coffee.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
    <defs>
      <linearGradient id="bgTr" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2D1C19"/>
        <stop offset="100%" stop-color="#160B09"/>
      </linearGradient>
      <linearGradient id="copper" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#D97A48"/>
        <stop offset="50%" stop-color="#B85929"/>
        <stop offset="100%" stop-color="#733212"/>
      </linearGradient>
    </defs>
    <rect width="600" height="450" fill="url(#bgTr)"/>
    <ellipse cx="300" cy="385" rx="170" ry="22" fill="#0A0403" opacity="0.6"/>
    <!-- Copper Cezve / Ibrik Pot -->
    <path d="M190 230 L220 345 C222 355 235 360 280 360 C325 360 338 355 340 345 L370 230 Z" fill="url(#copper)"/>
    <!-- Cezve Long Wooden Handle -->
    <line x1="365" y1="240" x2="490" y2="160" stroke="#5A2E16" stroke-width="14" stroke-linecap="round"/>
    <line x1="430" y1="198" x2="490" y2="160" stroke="#8C4620" stroke-width="10" stroke-linecap="round"/>
    <!-- Cezve Brass Rim & Spout -->
    <ellipse cx="280" cy="230" rx="90" ry="20" fill="#E59866"/>
    <!-- Thick Golden Coffee Foam (Köpük) -->
    <ellipse cx="280" cy="232" rx="84" ry="17" fill="#693B1E"/>
    <ellipse cx="270" cy="231" rx="55" ry="12" fill="#A56E42"/>
    <circle cx="250" cy="230" r="4" fill="#C48F65"/>
    <circle cx="285" cy="233" r="5" fill="#C48F65"/>
    <circle cx="310" cy="229" r="3" fill="#C48F65"/>
    <!-- Decorative Engraving on Cezve -->
    <path d="M225 285 Q280 305 335 285" stroke="#E59866" stroke-width="3" fill="none" opacity="0.6"/>
    <path d="M235 315 Q280 335 325 315" stroke="#E59866" stroke-width="3" fill="none" opacity="0.6"/>
    <rect x="40" y="380" rx="14" width="130" height="28" fill="#75513D" opacity="0.9"/>
    <text x="105" y="398" fill="#FFF" font-family="'Space Grotesk', sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="1">HOT • TRADITIONAL</text>
  </svg>`,

  'irish-coffee.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
    <defs>
      <linearGradient id="bgIr" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1E2620"/>
        <stop offset="100%" stop-color="#0E1410"/>
      </linearGradient>
    </defs>
    <rect width="600" height="450" fill="url(#bgIr)"/>
    <ellipse cx="300" cy="390" rx="150" ry="20" fill="#050806" opacity="0.6"/>
    <!-- Footed Irish Coffee Glass -->
    <path d="M288 310 L288 365 L245 375 L355 375 L312 365 L312 310 Z" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
    <path d="M225 150 C225 280 250 310 300 310 C350 310 375 280 375 150 Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.4)" stroke-width="2.5"/>
    <!-- Glass Handle -->
    <path d="M370 190 C420 200 420 260 365 270" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="12" stroke-linecap="round"/>
    <!-- Hot Spiked Coffee Liquid -->
    <path d="M228 190 C228 275 252 305 300 305 C348 305 372 275 372 190 Z" fill="#2E180E"/>
    <!-- Floated Heavy Cream Collar -->
    <path d="M226 155 Q300 165 374 155 L372 190 Q300 200 228 190 Z" fill="#FFFDF8"/>
    <ellipse cx="300" cy="155" rx="74" ry="16" fill="#FAF5ED"/>
    <!-- Nutmeg / Cacao Specks on cream -->
    <circle cx="280" cy="155" r="1.5" fill="#75513D"/>
    <circle cx="305" cy="158" r="1.5" fill="#75513D"/>
    <circle cx="320" cy="153" r="1.5" fill="#75513D"/>
    <rect x="40" y="380" rx="14" width="130" height="28" fill="#89927A" opacity="0.9"/>
    <text x="105" y="398" fill="#FFF" font-family="'Space Grotesk', sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="1">HOT • SPECIALTY</text>
  </svg>`,

  'dalgona-coffee.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
    <defs>
      <linearGradient id="bgDg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#30241A"/>
        <stop offset="100%" stop-color="#140E0A"/>
      </linearGradient>
      <linearGradient id="dalgonaFoam" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#E5A663"/>
        <stop offset="50%" stop-color="#C57D3E"/>
        <stop offset="100%" stop-color="#9C5925"/>
      </linearGradient>
    </defs>
    <rect width="600" height="450" fill="url(#bgDg)"/>
    <ellipse cx="300" cy="390" rx="150" ry="20" fill="#0A0604" opacity="0.6"/>
    <!-- Short Rocks Glass -->
    <path d="M225 150 L242 365 C245 374 255 380 300 380 C345 380 355 374 358 365 L375 150 Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.35)" stroke-width="2.5"/>
    <!-- Cold Fresh Milk Layer -->
    <path d="M241 365 L235 240 Q300 245 365 240 L359 365 C355 374 345 378 300 378 C255 378 245 374 241 365 Z" fill="#FFFDF8"/>
    <!-- Whipped Thick Coffee Foam Crown -->
    <path d="M225 150 Q300 162 375 150 Q385 185 365 240 Q300 245 235 240 Q215 185 225 150 Z" fill="url(#dalgonaFoam)"/>
    <!-- Billowy Mousse Peaks -->
    <ellipse cx="300" cy="150" rx="75" ry="24" fill="#E5A663"/>
    <path d="M250 145 Q280 120 305 138 Q335 125 355 145" stroke="#FDE5C5" stroke-width="4" fill="none" stroke-linecap="round"/>
    <!-- Honeycomb Crumbles -->
    <polygon points="275,135 285,130 288,140 278,142" fill="#FFC966"/>
    <polygon points="315,130 325,127 327,137 318,138" fill="#FFC966"/>
    <rect x="40" y="380" rx="14" width="130" height="28" fill="#C47B4D" opacity="0.9"/>
    <text x="105" y="398" fill="#FFF" font-family="'Space Grotesk', sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="1">COLD • WHIPPED</text>
  </svg>`,

  'pour-over.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
    <defs>
      <linearGradient id="bgPo" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2B241C"/>
        <stop offset="100%" stop-color="#120F0C"/>
      </linearGradient>
    </defs>
    <rect width="600" height="450" fill="url(#bgPo)"/>
    <ellipse cx="300" cy="395" rx="160" ry="20" fill="#080705" opacity="0.6"/>
    <!-- Chemex Glass Hourglass -->
    <path d="M240 100 L360 100 L320 220 L375 360 C378 375 365 385 300 385 C235 385 222 375 225 360 L280 220 Z" fill="rgba(255,255,255,0.09)" stroke="rgba(255,255,255,0.4)" stroke-width="2.5"/>
    <!-- Wood Collar Neck & Leather Tie -->
    <rect x="270" y="205" width="60" height="35" rx="5" fill="#8C5A32" stroke="#5E381C" stroke-width="2"/>
    <ellipse cx="300" cy="222" rx="30" ry="6" fill="#3D2111"/>
    <circle cx="310" cy="222" r="5" fill="#E8B878"/>
    <!-- Coffee Filter Paper in top cone -->
    <polygon points="245,105 355,105 300,205" fill="#EFE3CD" stroke="#D9C7A7" stroke-width="1.5"/>
    <!-- Dark ground bed -->
    <polygon points="265,130 335,130 300,195" fill="#3E2314"/>
    <!-- Brewed Coffee Liquid in bottom globe -->
    <path d="M232 355 C235 372 248 380 300 380 C352 380 365 372 368 355 L340 280 Q300 288 260 280 Z" fill="#4B2211" opacity="0.85"/>
    <!-- Slow drip drop -->
    <circle cx="300" cy="250" r="3" fill="#693B1E"/>
    <rect x="40" y="380" rx="14" width="130" height="28" fill="#75513D" opacity="0.9"/>
    <text x="105" y="398" fill="#FFF" font-family="'Space Grotesk', sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="1">HOT • POUR OVER</text>
  </svg>`
};

for (const [filename, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(outDir, filename), content.trim());
  console.log(`Generated ${filename}`);
}

