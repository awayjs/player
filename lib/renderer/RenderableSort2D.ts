import IRenderable					= require("awayjs-display/lib/pool/IRenderable");
import IEntitySorter				= require("awayjs-display/lib/sort/IEntitySorter");

/**
 * @class away.sort.RenderableMergeSort
 */
class RenderableMergeSort implements IEntitySorter
{
    public sortBlendedRenderables(head:IRenderable):IRenderable
    {
        var headB:IRenderable;
        var fast:IRenderable;
        var slow:IRenderable;

        if (!head || !head.next) {
            return head;
        }

        // split in two sublists
        slow = head;
        fast = head.next;

        while (fast) {
            fast = fast.next;
            if (fast) {
                slow = slow.next;
                fast = fast.next;
            }
        }

        headB = slow.next;
        slow.next = null;

        // recurse
        head = this.sortBlendedRenderables(head);
        headB = this.sortBlendedRenderables(headB);

        // merge sublists while respecting order
        var result:IRenderable;
        var curr:IRenderable;
        var l:IRenderable;

        if (!head)
            return headB;
        if (!headB)
            return head;

        while (head && headB) {
            if (head.zIndex < headB.zIndex) {
                l = head;
                head = head.next;
            } else {
                l = headB;
                headB = headB.next;
            }

            if (!result)
                result = l; else
                curr.next = l;

            curr = l;
        }

        if (head)
            curr.next = head; else if (headB)
            curr.next = headB;

        return result;
    }

    public sortOpaqueRenderables(head:IRenderable):IRenderable
    {
        return this.sortBlendedRenderables(head);
    }
}

export = RenderableMergeSort;