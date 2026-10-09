import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import { OrganizationSchema } from "@/components/json-ld";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  /* Required so Next can resolve relative OG/Twitter/canonical URLs to
     absolute ones. Without it they fall back to http://localhost:3000. */
  metadataBase: new URL("https://nanocomputingict.com"),
  title: {
    default: "nano computing ICT solutions | Your Integrated Safety Partner",
    template: "%s | nano computing ICT solutions",
  },
  description:
    "Enterprise security & ICT infrastructure specialists in Addis Ababa, Ethiopia. High-definition CCTV & IP surveillance, door access control, time & attendance systems, structured networking, server infrastructure, web & mobile development. 7+ years · 200+ projects · 24/7 support.",
  keywords: [
    "CCTV security camera installation Addis Ababa",
    "IP surveillance Ethiopia",
    "door access control Ethiopia",
    "time attendance system Addis Ababa",
    "computer networking Ethiopia",
    "structured cabling Addis Ababa",
    "server infrastructure Ethiopia",
    "web development Addis Ababa",
    "mobile app development Ethiopia",
    "ICT solutions Ethiopia",
    "Nano Computing ICT solutions",
    "NCIS Ethiopia",
    "security systems Ethiopia",
    "biometric fingerprint reader Ethiopia",
    "NVR camera system Ethiopia",
    "WiFi installation Addis Ababa",
    "Apple Mac repair Ethiopia",
    "hard disk recovery Addis Ababa",
  ],
  authors: [{ name: "nano computing ICT solutions", url: "https://nanocomputingict.com" }],
  creator: "nano computing ICT solutions",
  publisher: "nano computing ICT solutions",
  openGraph: {
    title: "nano computing ICT solutions | Your Integrated Safety Partner",
    description:
      "Enterprise security & ICT specialists: CCTV, access control, networking, servers, and software development. Addis Ababa, Ethiopia. 7+ years · 200+ projects.",
    url: "https://nanocomputingict.com",
    siteName: "nano computing ICT solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "nano computing ICT solutions",
    description:
      "Your Integrated Safety Partner. CCTV, networking, server & software solutions. Addis Ababa, Ethiopia.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "./",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} font-sans`} suppressHydrationWarning>
      <body
        className={`${interTight.className} antialiased font-sans`}
        suppressHydrationWarning
      >
        {/*
          Some browser extensions (e.g. Bitdefender) inject marker attributes
          such as `bis_skin_checked`, `bis_register` and `__processed_*__`
          into the DOM before React hydrates. React then reports a hydration
          mismatch on elements it does not own (Next's hidden metadata div).
          This strips those attributes before hydration and keeps watching so
          any that arrive a moment later are removed too.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  if(typeof window!=="undefined"&&window.console){
    var orig=console.error;
    Object.defineProperty(console,"error",{
      configurable:true,
      enumerable:true,
      get:function(){
        return function(){
          for(var i=0;i<arguments.length;i++){
            var arg=arguments[i];
            if(typeof arg==="string"&&(arg.indexOf("bis_skin_checked")!==-1||arg.indexOf("bis_register")!==-1)){
              return;
            }
          }
          return orig.apply(this,arguments);
        };
      },
      set:function(fn){orig=fn;}
    });
  }
  var re=/^(bis_skin_checked|bis_register|__processed_[0-9a-f-]+__)$/;
  function clean(n){if(n&&n.nodeType===1&&n.attributes){for(var a=n.attributes,i=a.length-1;i>=0;i--){if(re.test(a[i].name))n.removeAttribute(a[i].name);}}}
  function walk(n){clean(n);for(var c=n.firstElementChild;c;c=c.nextElementSibling){walk(c);}}
  walk(document.documentElement);
  var mo=new MutationObserver(function(muts){
    for(var i=0;i<muts.length;i++){
      var m=muts[i];
      if(m.type==="attributes"){
        if(re.test(m.attributeName))m.target.removeAttribute(m.attributeName);
      }else{
        for(var j=0;j<m.addedNodes.length;j++){walk(m.addedNodes[j]);}
      }
    }
  });
  mo.observe(document.documentElement,{attributes:true,subtree:true,childList:true});
  window.addEventListener("load",function(){setTimeout(function(){mo.disconnect();},3000);});
})();`,
          }}
        />
        <OrganizationSchema />
        {children}
      </body>
    </html>
  );
}
