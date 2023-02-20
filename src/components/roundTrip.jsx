import { Box, Button, TextField } from '@mui/material';
import moment from 'moment';
import { useForm } from 'react-hook-form';

import { cabins } from '../constants/selectOptions';
import { handleFetch } from '../hooks/useFetch';
import ControllableSelect from './inputs/controllableSelect';

const defaultValues = {
    adults: 0,
    children: 0,
    infants: 0
}

const RoundTrip = ({ setData, setError }) => {
    const { handleSubmit, control, register, reset, setValue, watch } = useForm({ defaultValues: defaultValues })


    const handleDate = (fieldName) => (e) => setValue(fieldName, moment(e.target.value).format('YYYY-MM-DD'))

    const handleSearch = async (data) => {
        data.travelers = data.travelers?.map((traveler, index) => ({ ...traveler, id: (index + 1).toString() }))
        const res = await handleFetch({ data, method: 'post', path: 'round-trip' })
        if (res) {
            if (res.data)
                return setData(res.data)
        }
        setData(null)
        setError(res.error?.response?.body || 'Error')
    }

    const clear = () => {
        reset(defaultValues)
        setData([])
    }

    return (
        <Box component={'form'} onSubmit={handleSubmit(handleSearch)} display={'flex'} gap={2} flexDirection={'column'}>
            <TextField label={'Currency'} {...register('currencyCode')} fullWidth />
            <Box display={'flex'} gap={2}>
                <TextField label={'Departing from'} {...register('originLocationCode')} fullWidth />
                <TextField label={'Destination to'} {...register('destinationLocationCode')} fullWidth />
            </Box>
            <Box display={'flex'} gap={2}>
                <TextField
                    onChange={handleDate('departureDate')}
                    value={watch('departureDate')}
                    label={'Departure Date'}
                    InputLabelProps={{ shrink: true }}
                    type={'date'}
                    fullWidth
                />
                <TextField
                    onChange={handleDate('returnDate')}
                    value={watch('returnDate')}
                    label={'Return date'}
                    InputLabelProps={{ shrink: true }}
                    type={'date'}
                    fullWidth
                />
            </Box>
            <ControllableSelect
                options={cabins}
                label={'Cabin'}
                control={control}
                name={'cabin'}
            />
            <Box display={'flex'} gap={2}>
                <TextField type={'number'} label={'Adults'} {...register('adults', { valueAsNumber: true })} fullWidth />
                <TextField type={'number'} label={'Children'} {...register('children', { valueAsNumber: true })} fullWidth />
                <TextField type={'number'} label={'Infants'} {...register('infants', { valueAsNumber: true })} fullWidth />
            </Box>
            <Box display={'flex'} gap={3}><Button variant={'contained'} type={'submit'}>Search</Button><Button variant={'contained'} color={'error'} onClick={clear}>Clear</Button></Box>
        </Box>
    )
}

export default RoundTrip
