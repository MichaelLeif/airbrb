import React from 'react';
import {
  Link,
} from 'react-router-dom';
import '@fontsource/inter';
import Rating from '@mui/material/Rating';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Chip from '@mui/joy/Chip';
import { Box } from '@mui/material';

function Listinfo (props, dateValue, bookingStatus) {
  const item = {
    width: '332px',
    cursor: 'pointer',
  }
  let nights = 1;

  if (dateValue !== undefined) {
    let timeDuration = new Date(dateValue[1]) - new Date(dateValue[0]);
    timeDuration = timeDuration / (1000 * 3600 * 24);
    nights = timeDuration;
  }

  const BookingStatus = () => {
    if (bookingStatus) {
      console.log(bookingStatus);
      if (bookingStatus === 'accepted') {
        return (
         <Chip color='success' sx={{ marginLeft: '10px' }}>Accepted</Chip>
        )
      } else {
        return (
          <Chip color='warning' sx={{ marginLeft: '10px' }}>Pending</Chip>
        )
      }
    } else {
      return (
        <>
        </>
      )
    }
  }

  const MakeListing = () => {
    return (
      <>
        <Card variant="outlined" sx={{ width: 300 }}>
          <CardOverflow>
            <AspectRatio ratio="2">
              <img
                src={props.thumbnail}
                loading="lazy"
              />
            </AspectRatio>
          </CardOverflow>
          <CardContent>
            <Typography level="title-md">
              {props.title}
            </Typography>
            <Typography level="body-sm">
              {props.address.address}, {props.address.city}, {props.address.state}
            </Typography>
          </CardContent>
          <CardOverflow variant="soft">
            <Divider inset="context" />
            <CardContent orientation="horizontal">
              <Typography level="body-xs" sx={{ marginTop: '5px' }}>${props.price * nights}</Typography>
              <Divider orientation="vertical" />
              <Rating
                name="read-only"
                defaultValue={
                  props.reviews.reduce((r, a) => {
                    return r + a.rating
                  }, 0) / props.reviews.length
                }
                sx={{ marginTop: '5px', zIndex: '-1 !important' }}
                precision={0.1}
                size="small"
                readOnly
              />
              <Typography level="body-xs" sx={{ marginTop: '6px' }}>{
                (!props.reviews.length
                  ? 0
                  : props.reviews.reduce((r, a) => {
                    return r + a.rating
                  }, 0) / props.reviews.length).toFixed(2)
              }/5</Typography>
              <BookingStatus />
            </CardContent>
          </CardOverflow>
        </Card>
      </>
    )
  }
  let linkPath = `/listing/${props.id}`;

  if (bookingStatus === 'accepted') {
    linkPath = `${linkPath}/${true}`
  } else {
    linkPath = `${linkPath}/${false}`
  }

  if (dateValue !== undefined) {
    linkPath = linkPath + `/${dateValue[0]}/${dateValue[1]}`
  }

  return (
    <Box key={props.id} sx={item}>
      {console.log('rerender')}
      <Link to={linkPath} key={props.id} style={{ textDecoration: 'none', color: 'black', width: '332px' }}>
        <MakeListing />
      </Link>
    </Box>
  )
}

export default Listinfo
