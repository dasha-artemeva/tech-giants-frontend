import {Box, Modal, ModalProps} from "@mui/material";

export function CenterModal({children, ...props}: ModalProps) {
    return (<>
        <Modal {...props}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '30%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    padding: 4,
                    borderRadius: 2,
                }}
                bgcolor='background.default'
            >
                {children}
            </Box>
        </Modal>
    </>);
}

export default CenterModal;