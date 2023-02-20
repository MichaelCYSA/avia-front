import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

import { useHandleFetch } from '../hooks/useFetch';
import { mutateRequestData } from '../utils/mutateRequestData';
import DestinationsInput from './inputs/destinationInput';
import Travelers from './inputs/travelers';

const OneWay = ({ setData, setError }) => {
  const { handleSubmit, control, register, reset, setValue, watch } = useForm()

  const { handleFetch, isLoading } = useHandleFetch()

  const handleSearch = async (data) => {
    const mutatedData = mutateRequestData(data)
    const res = await handleFetch({ data: mutatedData, method: 'post', path: 'one-way' })
    if (res) {
      if (res.data)
        return setData(res.data)
    }
    setData(null)
    setError(res.error?.response?.body || 'Error')
  }

  const clear = () => {
    reset()
    setData([])
  }

  return (
    <Box component={'form'} onSubmit={handleSubmit(handleSearch)} display={'flex'} gap={2} flexDirection={'column'}>
      <TextField label={'Currency'} {...register('currencyCode')} fullWidth />
      <DestinationsInput
        setValue={setValue}
        control={control}
        register={register}
        watch={watch}
        name={'originDestinations'}
        oneWay
      />
      <Travelers
        control={control}
        name={'travelers'}
      />
      <Box display={'flex'} gap={3}><LoadingButton loading={isLoading} variant={'contained'} type={'submit'}>Search</LoadingButton><Button variant={'contained'} color={'error'} onClick={clear}>Clear</Button></Box>
    </Box>
  )
}

export default OneWay
