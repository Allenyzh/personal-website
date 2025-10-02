import { useEffect } from "react";

interface GoogleAnalyticsProps {
  gtagId: string;
}

export function GoogleAnalytics({ gtagId }: GoogleAnalyticsProps) {
  const analyticsEnabled = true;
  useEffect(() => {
    if (analyticsEnabled) {
      const script1 = document.createElement("script");
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
      document.head.appendChild(script1);

      const script2 = document.createElement("script");
      script2.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gtagId}');
            `;
      document.head.appendChild(script2);
    } else {
      console.log(
        "Google Analytics not loaded - user has not consented to analytics cookies"
      );
    }
  }, [analyticsEnabled, gtagId]);

  return null;
}
