interface IApplicantsDummyData {
  imgSrc?: string;
  name: string;
  dateApplied: string;
}

interface IJobsDummyData {
  imgSrc?: string;
  title: string;
  description: string;
  experience: string;
  pay: number;
}

export const ApplicantsDummyData: IApplicantsDummyData[] | [] = [
  {
    imgSrc: "/static/img/applicantdummy.jpg",
    name: "Dr Daniel Peters1",
    dateApplied: "2 days ago",
  },
  {
    imgSrc: "/static/img/applicantdummy.jpg",
    name: "Dr Daniel Peters2",
    dateApplied: "2 days ago",
  },
  {
    imgSrc: "/static/img/applicantdummy.jpg",
    name: "Dr Daniel Peters3",
    dateApplied: "2 days ago",
  },
  {
    imgSrc: "/static/img/applicantdummy.jpg",
    name: "Dr Daniel Peters4",
    dateApplied: "2 days ago",
  },
  {
    imgSrc: "/static/img/applicantdummy.jpg",
    name: "Dr Daniel Peters5",
    dateApplied: "2 days ago",
  },
  {
    imgSrc: "/static/img/applicantdummy.jpg",
    name: "Dr Daniel Peters6",
    dateApplied: "2 days ago",
  },
  {
    imgSrc: "/static/img/applicantdummy.jpg",
    name: "Dr Daniel Peters7",
    dateApplied: "2 days ago",
  },
  {
    imgSrc: "/static/img/applicantdummy.jpg",
    name: "Dr Daniel Peters8",
    dateApplied: "2 days ago",
  },
  {
    imgSrc: "/static/img/applicantdummy.jpg",
    name: "Dr Daniel Peters9",
    dateApplied: "2 days ago",
  },
];

export const JobsDummyData: IJobsDummyData[] | [] = [
  {
    imgSrc: "/static/img/photo-pharmacist.png",
    title: "Pharmacist",
    description: "A pharmacist is need at OOUTH, sagamu for an overnight shift ",
    experience: "2 years+",
    pay: 65000,
  },
  {
    imgSrc: "/static/img/photo-cardiologist.png",
    title: "Cardiologist",
    description: "A cardiologist is need at OOUTH, sagamu for a three(3) day shift ",
    experience: "6 years+",
    pay: 195000,
  },
];
