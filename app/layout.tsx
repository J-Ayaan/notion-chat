import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NotionChat - 노션 기반 팀 채팅',
  description: '노션을 백엔드로 사용하는 무료 팀 채팅 솔루션',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
