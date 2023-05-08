import Image from 'next/image'
import { Coin } from '../../lib/types'
import { useEffect, useState } from 'react'
import { fromSatoshis, toSatoshis } from 'lib/utils'

interface CoinInputProps {
  coin: Coin
  setAmount: (arg0?: number) => void
  openAssetsModal: () => void
}

export default function CoinInput({
  coin,
  setAmount,
  openAssetsModal,
}: CoinInputProps): any {
  const [value, setValue] = useState('')

  // handle change of value on input form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setValue(value)
    if (value.match(/\.$/)) return
    const satoshis =
      value === '' ? undefined : toSatoshis(Number(value), coin.precision)
    setAmount(satoshis)
  }

  useEffect(() => {
    const prettyNum = fromSatoshis(coin.amount, coin.precision).toString()
    setValue(typeof coin.amount === 'undefined' ? '' : prettyNum)
  }, [coin.amount, coin.precision])

  // deconstruct coin
  const { iconSrc, ticker } = coin

  return (
    <div className="columns m-0 has-background-dark">
      <div className="column pl-4 pt-4 is-half">
        <a onClick={openAssetsModal}>
          <div className="is-flex is-align-items-center">
            <Image src={iconSrc} alt="coin logo" height={32} width={32} />
            <p className="subtitle has-text-white ml-2">{ticker}</p>
          </div>
        </a>
      </div>
      <div className="column p-0">
        <input
          className="input is-large has-background-dark has-text-white has-text-right"
          onChange={handleChange}
          placeholder="0.00"
          type="text"
          value={value}
        />
      </div>
    </div>
  )
}
