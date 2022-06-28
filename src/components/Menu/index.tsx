import React, {
  CSSProperties,
  FC,
  PropsWithChildren,
  useCallback,
} from "react";
import { CreateMenu, CloseModalButton } from "./styles";

interface Props {
  show?: boolean;
  onCloseModal?: () => void;
  style?: CSSProperties;
  closeButton?: boolean;
}

const Menu: FC<PropsWithChildren<Props>> = ({
  onCloseModal,
  style,
  show,
  children,
  closeButton = true,
}) => {
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }

  return (
    <CreateMenu onClick={onCloseModal}>
      <div onClick={stopPropagation} style={style}>
        {/* {closeButton && ( */}
        <CloseModalButton onClick={onCloseModal}>X</CloseModalButton>
        {/* )} */}
        {children}
      </div>
    </CreateMenu>
  );
};

export default Menu;
