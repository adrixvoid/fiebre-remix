import Button from "./ui/button/Button";
import { Center } from "./ui/center/Center";
import { Container } from "./ui/container/Container";
import Icon from "./ui/icon/Icon";
import { Link } from "./ui/link/Link";
import { Nav, NavLink } from "./ui/nav/Nav";
import { Text } from "./ui/text/Text";

import { navigationLinks, SITE_TITLE, socialLinks } from "~/constants";
import styles from './footer.module.css';

export function Footer() {
  const today = new Date();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          {SITE_TITLE}
          <Nav>
            {
              navigationLinks.map((link) => (
                <NavLink key={link.href} to={link.href}>{link.label}</NavLink>
              ))
            }
          </Nav>
          <div className={styles.social}>
            {
              socialLinks.map((link) => (
                <Button
                  key={link.href}
                  variant="link"
                  target="_blank"
                  href={link.href}
                  title={link.title}
                  rel={link.rel}
                  aria-label={link.title}
                >
                  <Icon icon={link.icon} size="24px" />
                  <span className={styles.label}>{link.label}</span>
                </Button>
              ))
            }
          </div>
        </div>
        <Center style={{ marginTop: "2rem" }}>
          <Text size="sm" align="center">
            &copy; {today.getFullYear()} Fiebre. All rights reserved.<br />
            <Link href="mailto:fiebredg@hotmail.com">fiebredg@hotmail.com</Link>
          </Text>
        </Center>
      </Container>
    </footer>
  );
}

export default Footer;
