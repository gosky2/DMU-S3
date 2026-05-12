# 도서관 대출 관리 시스템

## 1. 시스템 소개

React로 구현한 정적 웹 기반 도서관 대출 관리 시스템입니다.  
사용자는 도서를 검색하고, 대출/반납 상태를 관리할 수 있습니다.

## 2. 주요 기능

- 도서 목록 조회
- 도서 검색 (제목 / 저자 / 카테고리)
- 대출 가능 / 대출 중 필터
- 대출 및 반납 처리 (버튼 클릭 시 즉시 반영)
- 현재 대출 목록 패널
- localStorage 기반 상태 저장 (새로고침 후에도 유지)
- 대출 현황 통계 (전체 도서 수, 대출 가능 도서 수, 대출 중 도서 수)

## 3. 사용 기술

- React
- Vite
- JavaScript
- CSS
- AWS S3
- GitHub Actions
- AWS Amplify

## 4. CI/CD 환경

GitHub Actions를 사용하여 `main` 브랜치에 push하면 자동으로 React 프로젝트를 빌드하고, `dist` 폴더를 AWS S3 버킷에 업로드합니다.  
워크플로 파일은 `.github/workflows/deploy.yml` 입니다.  
AWS Academy 등에서 발급되는 임시 자격 증명을 쓰는 경우, GitHub Secrets에 `AWS_SESSION_TOKEN`을 반드시 함께 설정합니다.

AWS Amplify(실습 5)는 동일 저장소를 Amplify Hosting에 연결하고, 루트의 `amplify.yml`을 빌드 스펙으로 사용합니다. 저장소에 푸시되면 Amplify가 `npm install` 및 `npm run build`를 수행한 뒤 `dist`를 호스팅합니다.

**로컬 개발:** 저장소 클론 후 `npm install`, `npm run dev` 로 실행합니다. `npm run build` 로 프로덕션 산출물을 확인할 수 있습니다.

**S3 버킷 이름:** 과제 안내대로 `mybucket-학번` 형태로 콘솔에서 생성하고, 코드에는 버킷명을 하드코딩하지 않습니다.  
정적 웹 사이트 호스팅을 켜고 인덱스 문서를 `index.html` 로 지정합니다. 공개 읽기가 필요하면 버킷 정책 예시는 다음과 같습니다 (`내-버킷-이름`을 실제 버킷명으로 바꿉니다).

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::내-버킷-이름/*"
    }
  ]
}
```

## 5. 배포 URL

- S3 Website URL: `세션 유효 시간 내 URL 작성 (제출 전 교체)`
- Amplify URL: `세션 유효 시간 내 URL 작성 (제출 전 교체)`

## 6. 시연 영상

- GitHub Actions CI/CD 시연 영상: `YouTube 링크 (제출 전 교체)`
- AWS Amplify 호스팅 시연 영상: `YouTube 링크 (제출 전 교체)`

---

작성자: 이하늘
