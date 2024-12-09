// Type defination
export enum SegmentedViewReducerActionType {
  CLICK_SEGMENT = 'segmet-clicked',
}

export interface ISegmentedViewReducerActionType {
  type: SegmentedViewReducerActionType;
  payload: any;
}

export interface IsegmentedViewControllerTitle {
  title: string;
}

export type State = { index: number };

export interface ISegmentedViewData {
  children: React.ReactNode[] | React.ReactNode | any;
  state?: State;
  handleStateChange?: (...args: any) => void;
}

export interface ISegmentedViewController extends ISegmentedViewData {
  segmentedViewControllerTitle: IsegmentedViewControllerTitle[];
}
