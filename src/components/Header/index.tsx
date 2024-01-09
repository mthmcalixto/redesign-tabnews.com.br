import { Logo } from '@/utils/icons'
import { BiSearch } from 'react-icons/bi'
import { FiMenu } from 'react-icons/fi'
import { Button } from '../Button'
import * as S from './styles'

export default function Header() {
  return (
    <S.HeaderRoot>
      <S.HeaderContainer>
        <S.HeaderWrapper>
          <S.HeaderLeft>
            <S.LogoRoot>
              <a href="/" className="hover:opacity-45">
                <Logo color="#fff" width={144.214} height={28.583} />
              </a>
              <BiSearch size={27} color="#C9D1D9" />
            </S.LogoRoot>
          </S.HeaderLeft>
          <S.HeaderCenter />
          <S.HeaderRight>
            <ul className="hidden md:flex items-center list-none text-header-color-secondary justify-between max-w-[12rem] w-full mr-6 font-medium">
              <li>Submit</li>
              <li>Ask</li>
              <li>Jobs</li>
            </ul>
            <div className="hidden md:inline-block h-[1.7em] min-h-[1em] w-[1.2px] mx-2 bg-header-color-secondary"></div>
            <div>
              <div className="hidden md:flex items-center">
                <Button $intent="no_style">Login</Button>
                <Button>Sing Up</Button>
                <div className="ml-4">
                  <FiMenu color="#fff" size={42} />
                </div>
              </div>
              <div className="flex md:hidden items-center">
                <FiMenu color="#fff" size={42} />
              </div>
            </div>
          </S.HeaderRight>
        </S.HeaderWrapper>
      </S.HeaderContainer>
    </S.HeaderRoot>
  )
}
