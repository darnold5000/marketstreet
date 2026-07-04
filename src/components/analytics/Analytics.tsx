import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export function Analytics() {
  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}
      {CLARITY_ID && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      )}
      <Script id="analytics-events" strategy="afterInteractive">
        {`
          document.addEventListener('click', function(e) {
            var target = e.target.closest('[data-track]');
            if (!target) return;
            var event = target.getAttribute('data-track');
            if (typeof gtag !== 'undefined') {
              gtag('event', event, { event_category: 'engagement' });
            }
          });
          document.addEventListener('click', function(e) {
            var link = e.target.closest('a[href^="tel:"]');
            if (!link) return;
            if (typeof gtag !== 'undefined') {
              gtag('event', 'phone_click', { event_category: 'conversion' });
            }
          });
        `}
      </Script>
    </>
  );
}
