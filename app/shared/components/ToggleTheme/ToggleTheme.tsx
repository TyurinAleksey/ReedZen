import Moon from "@app/shared/icons/Moon";
import Sun from "@app/shared/icons/Sun";
import { isTheme } from "@app/store/Slice/themeSlice";
import { RootState } from "@app/store/store";
import { useDispatch, useSelector } from "react-redux";

interface ToggleThemeProps {
  className?: string;
}

export default function ToggleTheme({ className }: ToggleThemeProps) {
  const dispath = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  return (
    <>
      <button
        onClick={() => dispath(isTheme())}
        className={`theme-toggle ${className}`}
      >
        {theme === "dark" ? <Sun /> : <Moon />}
      </button>
    </>
  );
}
