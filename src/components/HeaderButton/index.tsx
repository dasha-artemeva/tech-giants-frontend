import {Button, ButtonProps} from "@mui/material";

export function HeaderButton({children, ...props}: ButtonProps) {
    return <>
        <Button
            variant="outlined"
            size="small"
            sx={{
                borderRadius: 5,
                textTransform: "none",
            }}
            color="secondary"
            {...props}
        >
            {children}
        </Button>
    </>;
}

export default HeaderButton;