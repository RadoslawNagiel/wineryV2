import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [],
    selector: `app-explore-container`,
    templateUrl: `./explore-container.component.html`,
    styleUrls: [`./explore-container.component.scss`],
})
export class ExploreContainerComponent {
    @Input() name?: string;
}
