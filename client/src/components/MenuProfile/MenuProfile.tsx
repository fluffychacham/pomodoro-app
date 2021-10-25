import { PersonOutlined } from "@material-ui/icons";
import { FunctionComponent } from "react";
import { isStringEmpty } from "../../utils/strings";
import style from "./MenuProfile.module.scss";

const NO_PROFILE_TEXT = "No profile data";

/**
 * Empty menu profile
 *
 * @returns Tsx
 */
const EmptyMenuProfile: FunctionComponent = () => {
  return (
    <div className={style.emptyProfile}>
      <div className={style.emptyProfileIcon}>
        <PersonOutlined />
      </div>
      <div className={style.emptyProfileLabel}>{NO_PROFILE_TEXT}</div>
    </div>
  );
};

interface IMenuProfileProps {
  className?: string;

  url?: string;
  firstName?: string;
  lastName?: string;
}

/**
 * Menu profile react component.
 *
 * @return Tsx
 */
export const MenuProfile: FunctionComponent<IMenuProfileProps> = ({
  className,
  url,
  firstName,
  lastName,
}) => {
  const getNameInitial = (firstName?: string, lastName?: string): string => {
    return `${firstName?.toUpperCase().substr(0, 1)}${lastName
      ?.toUpperCase()
      ?.substr(0, 1)}`;
  };

  if (isStringEmpty(firstName) && isStringEmpty(lastName))
    return <EmptyMenuProfile />;

  return (
    <div className={`${style.container}${!!className ? ` ${className}` : ""}`}>
      <div className={style.image}>
        <img src={url} alt={getNameInitial(firstName, lastName)} />
      </div>
      <div className={style.name}>{`${firstName} ${lastName}`}</div>
    </div>
  );
};
