import { SocialLink } from "./social-link";
import { FacebookIcon } from "./icons/facebook-icon";
import { InstagramIcon } from "./icons/instagram-icon";
import { XIcon } from "./icons/x-icon";
import { TelegramIcon } from "./icons/telegram-icon";
import { YoutubeIcon } from "./icons/youtube-icon";

export function SocialLinks() {
  return (
    <div className="flex items-center gap-2">
      <SocialLink
        href="#"
        label="Facebook"
        icon={<FacebookIcon className="size-6" />}
      />
      <SocialLink
        href="#"
        label="Instagram"
        icon={<InstagramIcon className="size-6" />}
      />
      <SocialLink
        href="#"
        label="X"
        icon={<XIcon className="size-6" />}
      />
      <SocialLink
        href="#"
        label="Telegram"
        icon={<TelegramIcon className="size-6" />}
      />
      <SocialLink
        href="#"
        label="YouTube"
        icon={<YoutubeIcon className="size-6" />}
      />
    </div>
  );
}
