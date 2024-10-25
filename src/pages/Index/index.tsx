import { Box, Button, CircularProgress, Container, Stack, Typography } from "@mui/material";
import { useConferenceStore } from "../../stores/conference.store.ts";
import { useEffect, useState, useRef } from "react";
import { useGlobalStore } from "../../stores/global.store.ts";
import { DateTime } from 'luxon';

interface Image {
    src: string;
    alt: string;
}

// Определяем интерфейс для пропсов
interface SwipeableImageProps {
    images: Image[]; // Массив изображений
}

const images = [
    { src: '../src/components/images/IMG_5580.jpg', alt: "Изображение 1", },
    { src: '../src/components/images/IMG_5581.jpg', alt: "Изображение 2",  },
    { src: '../src/components/images/IMG_5582.jpg', alt: "Изображение 3" },
    { src: '../src/components/images/IMG_5584.jpg', alt: "Изображение 4" },
    { src: '../src/components/images/IMG_5585.jpg', alt: "Изображение 5" },
    { src: '../src/components/images/IMG_5586.jpg', alt: "Изображение 6" },
    { src: '../src/components/images/IMG_5587.jpg', alt: "Изображение 7" },
    { src: '../src/components/images/IMG_5590.jpg', alt: "Изображение 8" },
    { src: '../src/components/images/IMG_5591.jpg', alt: "Изображение 9" },
    { src: '../src/components/images/photo_5244767466784156973_y.jpg', alt: "Изображение 10" },
    { src: '../src/components/images/photo_5244767466784156975_y.jpg', alt: "Изображение 11" },
];

const SwipeableImage: React.FC<SwipeableImageProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX; // Запоминаем начальную позицию касания
    };

    const onTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX; // Обновляем конечную позицию касания
    };

    const onTouchEnd = () => {
        const diffX = touchStartX.current - touchEndX.current; // Разница между начальной и конечной позициями

        if (diffX > 50) {
            nextImage(); // Свайп влево
        } else if (diffX < -50) {
            prevImage(); // Свайп вправо
        }
    };

    return (
        <Box
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            sx={{
                width: { xs: '100%', sm: '600px' },
                height: { xs: '300px', sm: '600px' },
                marginLeft: "100px",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                cursor: 'pointer',
                userSelect: 'none',
                
            }}
        >
            {images.length > 0 ? (
                <img
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt}
                    style={{ maxWidth: '600px', maxHeight: '600px', borderRadius: '8px' }}
                />
            ) : (
                <p>Нет изображений для отображения</p>
            )}
            <Button
                onClick={prevImage}
                sx={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)', // Центрируем по вертикали
                    zIndex: 1,
                    margin: '0 -58px',
                    display: { xs: 'none', sm: 'block'  }
                    
                }}
            >
                <img src="../src/components/images/left-arrow.jpg" alt="<" style={{ width: '30px', height: '30px'  }} />
            </Button>
            <Button
                onClick={nextImage}
                sx={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)', // Центрируем по вертикали
                    zIndex: 1,
                    margin: '0 -58px',
                    display: { xs: 'none', sm: 'block' },
                }}
            >
                <img src="../src/components/images/right-arrow.jpg" alt=">" style={{ width: '30px', height: 'px' }} />
            </Button>
        </Box>
    );
};



export function Index() {
    const conference = useConferenceStore(state => state.conference);
    const refreshConference = useConferenceStore(state => state.refresh);
    useEffect(() => {
        refreshConference().then(null);
    }, []);
    const globalStore = useGlobalStore();
    if (!conference)
        return <Box display="flex" justifyContent="center" py={5}>
            <CircularProgress />
        </Box>
    const confStart = new DateTime(conference.start_date).setLocale('ru').toFormat('d MMMM');

    return (
        <Container>
            <Stack direction="column" gap={2}>
                <Typography variant="h6" color="primary">
                    {conference.grade}
                </Typography>
                <Typography variant="h3">
                    {conference.short_name}
                </Typography>
                <Typography variant="body1" color="text.hint">
                    {conference.name}
                </Typography>
                <Button
                    variant="contained"
                    sx={{
 borderRadius: 3,
                        maxWidth: {
                            sm: '30%'
                        }
                    }}
                    onClick={() => globalStore.setAuthModalOpened(true )}
                >
                    Подать заявку
                </Button>
                <Box width="80%">
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        flexDirection={() => ({ xs: 'column', sm: 'row' })}
                        gap={2}
                    >
                        <Box sx={{
                            borderLeft: 2,
                            borderColor: 'secondary.main',
                            pl: 1
                        }}>
                            <Typography variant="body1" color="text.hint">
                                Начало
                            </Typography>
                            <Typography variant="body2">
                                {confStart}
                            </Typography>
                        </Box>
                        <Box sx={{
                            borderLeft: 2,
                            borderColor: 'secondary.main',
                            pl: 1
                        }}>
                            <Typography variant="body1" color="text.hint">
                                Продолжительность
                            </Typography>
                            <Typography variant="body2">
                                {conference.duration}
                            </Typography>
                        </Box>
                        <Box sx={{
                            borderLeft: 2,
                            borderColor: 'secondary.main',
                            pl: 1
                        }}>
                            <Typography variant="body1" color="text.hint">
                                Формат конференции
                            </Typography>
                            <Typography variant="body2">
                                {conference.format}
                            </Typography>
                        </Box>

                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: 'center',}}>
    <Box sx={{ flex: 1, }}>
        <Typography variant="body1" width={"500px"} sx={{ mt: 0, textAlign: 'justify', fontSize: { xs: '0.8rem', sm: '1.7rem' } }}>
        &emsp;На кафедре БИТ ИКТИБ проводятся конференции по информационной безопасности. Научно-практическая конференция "Информационная безопасность" проводилась с 2003 по 2016 годы. <br></br> &emsp;2024 году планируется возобновить проведение&nbsp;конференции, присвоив ей имя основателя профессора О.Б. Макаревича.
        
        </Typography>
    </Box>

    <Box sx={{ flex: 1, maxWidth: { xs: '100%', sm: '400px' }, display: 'flex', justifyContent: 'center', marginLeft: "100px" }}>
        {/* Фотогалерея */}
        <SwipeableImage images={images} />
    </Box>

                    </Box>
                </Box>
            </Stack>
        </Container>
    );
}

export default Index;
