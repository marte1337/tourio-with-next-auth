import styled from "styled-components";
import Card from "../components/Card.js";
import useSWR from "swr";
import Link from "next/link.js";
import { StyledLink } from "../components/StyledLink.js";
import { useSession } from "next-auth/react";

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-left: 0;
`;

const ListItem = styled.li`
  position: relative;
  width: 100%;
`;
const FixedLink = styled(StyledLink)`
  position: fixed;
  bottom: 50px;
  right: 50px;
`;
export default function Home() {
  const { data } = useSWR("/api/places", { fallbackData: [] });
  const { data: session } = useSession();
  return (
    <>
      <List role="list">
        {data.map((place) => {
          return (
            <ListItem key={place._id}>
              <Card
                name={place.name}
                image={place.image}
                location={place.location}
                id={place._id}
              />
            </ListItem>
          );
        })}
      </List>
      {session && (
        <Link href="/create" passHref legacyBehavior>
          <FixedLink>+ place</FixedLink>
        </Link>
      )}
    </>
  );
}

{/* 
1. npm install next-auth
2.  next-auth API Route erstellen: pages/api/auth/[…nextauth].js (copy file from docs)
3. Den Session Kontext bereitstellen:
import {SessionProvider} from “next-auth/react”
<SessionProvider session={pageProps.session}>
	<Component {…pageProps} />
</SessionProvider>
4. Den useSession-Hook benutzen:
Import {useSession, signIn, signOut} from “next-auth/react”
signIn und signOut-Funktionen für Login benutzen (siehe docs)
const {data: session} = useSession();
…z.B. Conditional rendering: { session && <button>…</button> }
5. O-Auth App bei Github anmelden:
Settings -> Developer Settings -> OAuth Apps -> New OAuth App
Authorization callback URL: z.B. http://localhost:3000/api/auth/callback/github
Client ID kopieren und in .env.local als GITHUB__ID eintragen
Client Secret erzeugen, kopieren und als GITHUB_SECRET in .env.local speichern
(Tipp: Für Vercel-Deployment eigene OAuth App eintragen)
6. Next-auth Umgebungsvariablen:
NEXTAUTH_URL=http://localhost:3000 (bzw. Vercel-Deployment)
NEXTAUTH_SECRET=<secret>
Das <secret> in der Konsole mit dem Befehl openssl rand -base64 32 erzeugen, kopieren und hier speichern.
7. API Route sichern (siehe docs):
Import { getServerSession } from “next-auth/next”
Import { authOptions} from “../auth/[…nextauth]”
const session = await getServerSession (req, res, authOptions}
if (session){ //success…}
else { // not authorized}
Daten an User binden:
8. Modell anpassen:
…
author: String
…
9. POST-Request anpassen:
const place= new Place ( { …placeData, author: session.user.email } )
10. GET-Request anpassen:
const places = await Place.find ( { author: session.user.email } 
 */}
