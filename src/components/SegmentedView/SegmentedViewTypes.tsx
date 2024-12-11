// Type definition
export enum SegmentedViewReducerActionType {
  CLICK_SEGMENT = 'segment-clicked',
}

export interface ISegmentedViewReducerActionType {
  type: SegmentedViewReducerActionType;
  payload: any;
}

export interface ISegmentedViewControllerTitle {
  title: string;
}

export type State = { index: number };

export interface ISegmentedViewData {
  children: React.ReactNode[] | React.ReactNode | any;
  state?: State;
  handleStateChange?: (...args: any) => void;
}

export interface ISegmentedViewController extends ISegmentedViewData {
  segmentedViewControllerTitle: ISegmentedViewControllerTitle[];
  className?: string;
}
