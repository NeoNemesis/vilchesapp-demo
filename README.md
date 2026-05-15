# Taskit — Live demo

Komplett klickbar demo av **Taskit**, SaaS-plattformen för hantverks- och serviceföretag.

## Vad du kan klicka runt i

| Vy | Beskrivning |
|---|---|
| **Landing** | Hemsidan kund ser innan signup — features, prissättning, nätverk |
| **Demo-väljare** | Välj företag (Byggmax, Vilches, Snickeri) och roll |
| **Superadmin** | Plattformsperspektiv — tenants, planer, Fortnox-koppling, MRR |
| **Dashboard** | Intäktsstatistik, aktiva projekt med progress |
| **Ordrar** | Orderflöde från offert till slutförd installation |
| **Projekt** | Projektkort med progress, team och leveransdata |
| **Offerter** | AI-genererade offerter (endast admin) |

## Tre kundföretag, tre branscher

- **Byggmax AB** — Bygg & Renovering (#4AE54A)
- **Vilches Entreprenad** — Mark & Anläggning (#2C7A4B)
- **Demo Snickeri AB** — Snickeri & Inredning (#3b82f6)

Varje företag har sin egen primärfärg och egna mockdata — växla mellan dem för att se hur Taskit ser olika ut per kund.

## Roller

- **Superadmin (Victor)** — hanterar alla kunder i plattformen
- **Admin** — företagsägare, full kontroll över sitt företag
- **Underentreprenör** — får projekt från andra Taskit-företag via Network
- **Anställd (montör)** — tidsrapportering och uppgifter

## Plattformsfunktioner

- Multi-tenant: separat databas per kund
- Cross-company network: dela projekt mellan företag på plattformen
- Fortnox-integration: fakturor skapas och skickas automatiskt
- OCR-skanning av papperordrar
- AI-driven offertgenerering
- Tidrapportering med attestflöde
- Fakturering med ROT/RUT-avdrag

## Teknisk stack

- React 18 + TypeScript + Vite
- Tailwind CSS
- React Router v6 (HashRouter)
- Recharts
- lucide-react

## Lokalt

```bash
npm install --ignore-scripts
npm run dev      # http://localhost:5173
npm run build    # ./dist
```

---

*All data i demon är fiktiva exempeldata. Plattformen drivs av Vilches AB.*
